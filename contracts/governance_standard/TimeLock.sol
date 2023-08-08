// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  // minDelay: how long you have to wait before executing
  // proposers is the list of addresses that can propose
  // executors: who can execute when a proposal passes
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors,
    address admin
  ) TimelockController(minDelay, proposers, executors, msg.sender) {}
}
