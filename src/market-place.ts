import { BigInt } from '@graphprotocol/graph-ts';
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

  let holder = createOrGetHolder(offer.creator);

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

  let holder = createOrGetHolder(offer.creator);

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

  let holder = createOrGetHolder(offer.creator);

  holder.openedOfferAmount = holder.openedOfferAmount.minus(offer.amount);
  holder.save();
}

export function handlePositionCreated(event: PositionCreatedEvent): void {
  const {
    key,
    price,
    amount,
    minAmount,
    maxAmount,
    priceType,
    paymentMethod,
    token,
    creator,
    terms,
  } = event.params;
  let position = new Position(key);
  position.price = price;
  position.amount = amount;
  position.offeredAmount = BigInt.zero();
  position.minAmount = minAmount;
  position.maxAmount = maxAmount;
  position.priceType = priceType;
  position.paymentMethod = paymentMethod;
  position.token = token;
  position.creator = creator;
  position.terms = terms;

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
