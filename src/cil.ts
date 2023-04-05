import { Address, BigInt } from '@graphprotocol/graph-ts';
import { CILHolder, AppVariable } from '../generated/schema';
import { Transfer as TransferEvent } from '../generated/CIL/CIL';

export function createOrGetAppVariable(name: string): AppVariable {
  let record = AppVariable.load(name);

  if (!record) {
    record = new AppVariable(name);

    record.value = BigInt.zero();
    record.save();
  }
  return record;
}

export function createOrGetHolder(user: Address): CILHolder {
  let holder = CILHolder.load(user);
  if (!holder) {
    holder = new CILHolder(user);

    holder.balance = BigInt.zero();
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

    let totalHolders = createOrGetAppVariable('TotalHolders');

    totalHolders.value = totalHolders.value.plus(BigInt.fromI32(1));

    totalHolders.save();
  }

  return holder;
}

export function handleTransfer(event: TransferEvent): void {
  if (event.params.from != Address.zero()) {
    let from = createOrGetHolder(event.params.from);
    from.balance = from.balance.minus(event.params.value);
    from.save();
  }

  if (event.params.to != Address.zero()) {
    let to = createOrGetHolder(event.params.to);
    to.balance = to.balance.plus(event.params.value);
    to.save();
  }
}
