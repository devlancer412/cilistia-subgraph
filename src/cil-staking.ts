import {
  StakeUpdated as StakeUpdatedEvent,
  UnStaked as UnStakedEvent,
} from '../generated/CILStaking/CILStaking';
import { StakeHistory, UnStakeHistory } from '../generated/schema';
import { createOrGetHolder } from './cil-holder';

export function handleStakeUpdated(event: StakeUpdatedEvent): void {
  const { user, stakedAmount, lockedAmount } = event.params;
  let entity = new StakeHistory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = user;
  entity.stakedAmount = stakedAmount;
  entity.lockedAmount = lockedAmount;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let holder = createOrGetHolder(user);
  if (stakedAmount > holder.stakedAmount) {
    holder.totalRewardAmount = holder.totalRewardAmount
      .plus(stakedAmount)
      .minus(holder.stakedAmount);
  }
  holder.stakedAmount = stakedAmount;
  holder.lockedAmount = lockedAmount;
  holder.blockTimestamp = event.block.timestamp;

  holder.save();
}

export function handleUnStaked(event: UnStakedEvent): void {
  const { user, rewardAmount } = event.params;
  let entity = new UnStakeHistory(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = user;
  entity.rewardAmount = rewardAmount;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let holder = createOrGetHolder(user);

  holder.totalRewardAmount = holder.totalRewardAmount.plus(rewardAmount);

  holder.save();
}
