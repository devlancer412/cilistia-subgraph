import {
  StakeUpdated as StakeUpdatedEvent,
  UnStaked as UnStakedEvent,
} from '../generated/CILStaking/CILStaking';
import { StakeHistory, UnStakeHistory } from '../generated/schema';
import { createOrGetHolder } from './cil';

export function handleStakeUpdated(event: StakeUpdatedEvent): void {
  let entity = new StakeHistory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.stakedAmount = event.params.stakedAmount;
  entity.lockedAmount = event.params.lockedAmount;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let holder = createOrGetHolder(event.params.user);
  if (event.params.stakedAmount > holder.stakedAmount) {
    holder.totalRewardAmount = holder.totalRewardAmount
      .plus(event.params.stakedAmount)
      .minus(holder.stakedAmount);
  }
  holder.stakedAmount = event.params.stakedAmount;
  holder.lockedAmount = event.params.lockedAmount;

  holder.save();
}

export function handleUnStaked(event: UnStakedEvent): void {
  let entity = new UnStakeHistory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.rewardAmount = event.params.rewardAmount;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let holder = createOrGetHolder(event.params.user);

  holder.totalRewardAmount = holder.totalRewardAmount.plus(
    event.params.rewardAmount
  );

  holder.save();
}
