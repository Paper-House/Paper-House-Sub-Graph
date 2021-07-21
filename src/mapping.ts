import { BigInt, Value } from "@graphprotocol/graph-ts";
import {
  Contract,
  Approval,
  ApprovalForAll,
  Funding,
  Published,
  Transfer,
  UpdatePaper,
} from "../generated/Contract/Contract";

import { Paper, Fundings } from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleFunding(event: Funding): void {
    let funding = new Fundings(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
    let paper = Paper.load(event.params.paperid.toHex());

    funding.paperid = event.params.paperid.toString();
    funding.amount = event.params.amount.toString();
    funding.to = event.params.to;
    funding.from = event.params.from;
    paper.totalAmountFunded = event.params.totalAmountFunded.toString();

    funding.save();
    paper.save();
}

export function handlePublished(event: Published): void {
  // create a new instance of the paper.
  let paper = new Paper(event.params.tokenId.toHex());

  // set paper with the corresponding parameters.
  paper.owner = event.params.owner;
  paper.tokenUri = event.params.tokenUri;
  event.params.allowFunding == true
    ? (paper.allowFunding = "true")
    : (paper.allowFunding = "false");
  paper.author = event.params.author;
  paper.fundAmount = event.params.fundAmount.toString();
  paper.totalAmountFunded = "0";

  paper.save();
}

export function handleTransfer(event: Transfer): void {}

export function handleUpdatePaper(event: UpdatePaper): void {
  // get the paper id.
  let id = event.params.paperid.toHex();
  // get the paper.
  let paper = Paper.load(id);

  // update paper with new parameters.
  paper.fundAmount = event.params.amount.toString();
  event.params.allowFunding == true
    ? (paper.allowFunding = "true")
    : (paper.allowFunding = "false");

  paper.save();
}
