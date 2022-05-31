import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';

describe("SimpleStorage", function () {
    let simpleStorageFactory:SimpleStorage__factory
    let simpleStorage:SimpleStorage

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "5"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(expectedValue.toString(), currentValue.toString())
    })

    it("Should add person with their favourite number", async function () {
        const name = "sai"
        const expectedValue = "5465"
        const transactionResponse = await simpleStorage.addPerson(
            name,
            expectedValue
        )
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.nameToFavoriteNumber(name)

        assert.equal(currentValue.toString(), expectedValue)
    })
})