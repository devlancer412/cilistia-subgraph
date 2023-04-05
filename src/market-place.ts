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
import { createOrGetHolder } from './cil';

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

  let buyer = createOrGetHolder(Address.fromBytes(offer.buyer));

  buyer.openedOfferAmount = buyer.openedOfferAmount.minus(offer.amount);
  buyer.save();

  let seller = createOrGetHolder(Address.fromBytes(offer.seller));

  seller.openedPositionAmount = seller.openedPositionAmount.plus(offer.amount);
  seller.save();
}

export function handleOfferCreated(event: OfferCreatedEvent): void {
  let offer = new Offer(event.params.offerKey);
  let position = Position.load(event.params.positionKey)!;

  offer.status = 'Pending';
  offer.position = event.params.positionKey;
  offer.amount = event.params.amount;
  offer.terms = event.params.terms;
  offer.buyer = event.params.creator;
  offer.seller = position.creator;

  offer.blockTimestamp = event.block.timestamp;

  offer.save();

  let buyer = createOrGetHolder(Address.fromBytes(offer.buyer));

  buyer.openedOfferAmount = buyer.openedOfferAmount.plus(offer.amount);

  buyer.save();

  let seller = createOrGetHolder(Address.fromBytes(offer.seller));

  seller.openedPositionAmount = seller.openedPositionAmount.plus(offer.amount);
  seller.save();
}

export function handleOfferReleased(event: OfferReleasedEvent): void {
  let offer = Offer.load(event.params.key);

  if (!offer) {
    return;
  }

  offer.status = 'Released';
  offer.save();

  let buyer = createOrGetHolder(Address.fromBytes(offer.buyer));

  buyer.openedOfferAmount = buyer.openedOfferAmount.minus(offer.amount);
  buyer.totalBuyAmount = buyer.totalBuyAmount.plus(offer.amount);
  buyer.save();

  let seller = createOrGetHolder(Address.fromBytes(offer.seller));

  seller.openedPositionAmount = seller.openedPositionAmount.minus(offer.amount);
  seller.totalSaleAmount = seller.totalSaleAmount.plus(offer.amount);
  seller.save();
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
  let position = Position.load(event.params.key);
  if (!position) {
    return;
  }

  position.amount = event.params.amount;
  position.offeredAmount = event.params.offeredAmount;
  position.blockTimestamp = event.block.timestamp;

  position.save();
}
