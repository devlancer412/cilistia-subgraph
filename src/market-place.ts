import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  AccountBlocked as AccountBlockedEvent,
  OfferCanceled as OfferCanceledEvent,
  OfferCreated as OfferCreatedEvent,
  OfferReleased as OfferReleasedEvent,
  PositionCreated as PositionCreatedEvent,
  PositionUpdated as PositionUpdatedEvent,
} from '../generated/MarketPlace/MarketPlace';
import { Position, Offer } from '../generated/schema';
import { createOrGetHolder } from './cil-holder';

export function handleAccountBlocked(event: AccountBlockedEvent): void {
  let holder = createOrGetHolder(event.params.account);

  holder.stakedAmount = BigInt.zero();
  holder.lockedAmount = BigInt.zero();
  holder.blocked = true;

  holder.save();
}

export function handleOfferCanceled(event: OfferCanceledEvent): void {
  let offer = Offer.load(event.params.key);

  if (!offer) {
    return;
  }

  offer.status = 'Canceled';
  offer.save();

  let holder = createOrGetHolder(Address.fromBytes(offer.creator));

  holder.openedOfferAmount = holder.openedOfferAmount.minus(offer.amount);
  holder.save();
}

export function handleOfferCreated(event: OfferCreatedEvent): void {
  let offer = new Offer(event.params.offerKey);
  offer.position = event.params.positionKey;
  offer.amount = event.params.amount;
  offer.terms = event.params.terms;
  offer.creator = event.params.creator;

  offer.transactionHash = event.transaction.hash;

  offer.save();

  let holder = createOrGetHolder(Address.fromBytes(offer.creator));

  holder.openedOfferAmount = holder.openedOfferAmount.plus(offer.amount);

  holder.save();
}

export function handleOfferReleased(event: OfferReleasedEvent): void {
  let offer = Offer.load(event.params.key);

  if (!offer) {
    return;
  }

  offer.status = 'Canceled';
  offer.save();

  let holder = createOrGetHolder(Address.fromBytes(offer.creator));

  holder.openedOfferAmount = holder.openedOfferAmount.minus(offer.amount);
  holder.save();
}

export function handlePositionCreated(event: PositionCreatedEvent): void {
  let position = new Position(event.params.key);
  position.price = event.params.price;
  position.amount = event.params.amount;
  position.offeredAmount = BigInt.zero();
  position.minAmount = event.params.minAmount;
  position.maxAmount = event.params.maxAmount;
  position.priceType = event.params.priceType;
  position.paymentMethod = event.params.paymentMethod;
  position.token = event.params.token;
  position.creator = event.params.creator;
  position.terms = event.params.terms;

  position.blockTimestamp = event.block.timestamp;

  position.save();
}

export function handlePositionUpdated(event: PositionUpdatedEvent): void {
  let position = new Position(event.params.key);

  position.amount = event.params.amount;
  position.offeredAmount = event.params.offeredAmount;
  position.blockTimestamp = event.block.timestamp;

  position.save();
}
