import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { StakeUpdated } from "../generated/schema"
import { StakeUpdated as StakeUpdatedEvent } from "../generated/CILStaking/CILStaking"
import { handleStakeUpdated } from "../src/cil-staking"
import { createStakeUpdatedEvent } from "./cil-staking-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let stakedAmount = BigInt.fromI32(234)
    let lockedAmount = BigInt.fromI32(234)
    let newStakeUpdatedEvent = createStakeUpdatedEvent(
      user,
      stakedAmount,
      lockedAmount
    )
    handleStakeUpdated(newStakeUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("StakeUpdated created and stored", () => {
    assert.entityCount("StakeUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "StakeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "StakeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stakedAmount",
      "234"
    )
    assert.fieldEquals(
      "StakeUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lockedAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
