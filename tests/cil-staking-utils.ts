import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { StakeUpdated, UnStaked } from "../generated/CILStaking/CILStaking"

export function createStakeUpdatedEvent(
  user: Address,
  stakedAmount: BigInt,
  lockedAmount: BigInt
): StakeUpdated {
  let stakeUpdatedEvent = changetype<StakeUpdated>(newMockEvent())

  stakeUpdatedEvent.parameters = new Array()

  stakeUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  stakeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "stakedAmount",
      ethereum.Value.fromUnsignedBigInt(stakedAmount)
    )
  )
  stakeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "lockedAmount",
      ethereum.Value.fromUnsignedBigInt(lockedAmount)
    )
  )

  return stakeUpdatedEvent
}

export function createUnStakedEvent(
  user: Address,
  rewardAmount: BigInt
): UnStaked {
  let unStakedEvent = changetype<UnStaked>(newMockEvent())

  unStakedEvent.parameters = new Array()

  unStakedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  unStakedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return unStakedEvent
}
