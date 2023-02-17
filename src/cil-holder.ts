import { Address, BigInt } from '@graphprotocol/graph-ts';
import { CILHolder } from '../generated/schema';

export function createOrGetHolder(user: Address): CILHolder {
  let holder = CILHolder.load(user);
  if (!holder) {
    holder = new CILHolder(user);

    holder.stakedAmount = BigInt.zero();
    holder.lockedAmount = BigInt.zero();
    holder.totalStakedAmount = BigInt.zero();
    holder.totalRewardAmount = BigInt.zero();
    holder.totalSaleAmount = BigInt.zero();
    holder.totalBuyAmount = BigInt.zero();
    holder.openedPositionAmount = BigInt.zero();
    holder.openedOfferAmount = BigInt.zero();
    holder.blocked = false;

    holder.save();
  }

  return holder;
}
