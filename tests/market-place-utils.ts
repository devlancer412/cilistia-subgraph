import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AccountBlocked,
  OfferCanceled,
  OfferCreated,
  OfferReleased,
  OwnershipTransferred,
  PositionCreated,
  PositionUpdated
} from "../generated/MarketPlace/MarketPlace"

export function createAccountBlockedEvent(account: Address): AccountBlocked {
  let accountBlockedEvent = changetype<AccountBlocked>(newMockEvent())

  accountBlockedEvent.parameters = new Array()

  accountBlockedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return accountBlockedEvent
}

export function createOfferCanceledEvent(key: Bytes): OfferCanceled {
  let offerCanceledEvent = changetype<OfferCanceled>(newMockEvent())

  offerCanceledEvent.parameters = new Array()

  offerCanceledEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
  )

  return offerCanceledEvent
}

export function createOfferCreatedEvent(
  offerKey: Bytes,
  positionKey: Bytes,
  amount: BigInt,
  terms: string
): OfferCreated {
  let offerCreatedEvent = changetype<OfferCreated>(newMockEvent())

  offerCreatedEvent.parameters = new Array()

  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("offerKey", ethereum.Value.fromFixedBytes(offerKey))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "positionKey",
      ethereum.Value.fromFixedBytes(positionKey)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("terms", ethereum.Value.fromString(terms))
  )

  return offerCreatedEvent
}

export function createOfferReleasedEvent(key: Bytes): OfferReleased {
  let offerReleasedEvent = changetype<OfferReleased>(newMockEvent())

  offerReleasedEvent.parameters = new Array()

  offerReleasedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
  )

  return offerReleasedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPositionCreatedEvent(
  key: Bytes,
  price: BigInt,
  amount: BigInt,
  minAmount: BigInt,
  maxAmount: BigInt,
  priceType: boolean,
  paymentMethod: i32,
  token: Address,
  creator: Address,
  terms: string
): PositionCreated {
  let positionCreatedEvent = changetype<PositionCreated>(newMockEvent())

  positionCreatedEvent.parameters = new Array()

  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minAmount",
      ethereum.Value.fromUnsignedBigInt(minAmount)
    )
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxAmount",
      ethereum.Value.fromUnsignedBigInt(maxAmount)
    )
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("priceType", ethereum.Value.fromBoolean(priceType))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "paymentMethod",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(paymentMethod))
    )
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  positionCreatedEvent.parameters.push(
    new ethereum.EventParam("terms", ethereum.Value.fromString(terms))
  )

  return positionCreatedEvent
}

export function createPositionUpdatedEvent(
  key: Bytes,
  amount: BigInt
): PositionUpdated {
  let positionUpdatedEvent = changetype<PositionUpdated>(newMockEvent())

  positionUpdatedEvent.parameters = new Array()

  positionUpdatedEvent.parameters.push(
    new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
  )
  positionUpdatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return positionUpdatedEvent
}
