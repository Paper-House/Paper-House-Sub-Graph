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

import { Paper } from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleFunding(event: Funding): void {
}

export function handlePublished(event: Published): void {
  // create a new instance of the paper.
  let paper = new Paper(event.params.tokenId.toHex());

  // update with new parameters.
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
