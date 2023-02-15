import {
  StakeUpdated as StakeUpdatedEvent,
  UnStaked as UnStakedEvent
} from "../generated/CILStaking/CILStaking"
import { StakeUpdated, UnStaked } from "../generated/schema"

export function handleStakeUpdated(event: StakeUpdatedEvent): void {
  let entity = new StakeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.stakedAmount = event.params.stakedAmount
  entity.lockedAmount = event.params.lockedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnStaked(event: UnStakedEvent): void {
  let entity = new UnStaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
