import {
  AccountBlocked as AccountBlockedEvent,
  OfferCanceled as OfferCanceledEvent,
  OfferCreated as OfferCreatedEvent,
  OfferReleased as OfferReleasedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PositionCreated as PositionCreatedEvent,
  PositionUpdated as PositionUpdatedEvent
} from "../generated/MarketPlace/MarketPlace"
import {
  AccountBlocked,
  OfferCanceled,
  OfferCreated,
  OfferReleased,
  OwnershipTransferred,
  PositionCreated,
  PositionUpdated
} from "../generated/schema"

export function handleAccountBlocked(event: AccountBlockedEvent): void {
  let entity = new AccountBlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOfferCanceled(event: OfferCanceledEvent): void {
  let entity = new OfferCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.key = event.params.key

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOfferCreated(event: OfferCreatedEvent): void {
  let entity = new OfferCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offerKey = event.params.offerKey
  entity.positionKey = event.params.positionKey
  entity.amount = event.params.amount
  entity.terms = event.params.terms

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOfferReleased(event: OfferReleasedEvent): void {
  let entity = new OfferReleased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.key = event.params.key

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePositionCreated(event: PositionCreatedEvent): void {
  let entity = new PositionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.key = event.params.key
  entity.price = event.params.price
  entity.amount = event.params.amount
  entity.minAmount = event.params.minAmount
  entity.maxAmount = event.params.maxAmount
  entity.priceType = event.params.priceType
  entity.paymentMethod = event.params.paymentMethod
  entity.token = event.params.token
  entity.creator = event.params.creator
  entity.terms = event.params.terms

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePositionUpdated(event: PositionUpdatedEvent): void {
  let entity = new PositionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.key = event.params.key
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
