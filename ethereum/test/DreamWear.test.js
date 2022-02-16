/* eslint-disable no-undef */
const assert = require('chai').assert;

const DreamWear = artifacts.require('./Dreamwear');

// Check for chai
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DreamWear', async (accounts) => {
    let contract;

    beforeEach(async () => {
        contract = await DreamWear.deployed();
    });

    describe('deployment', () => {
        it('deploys contract successfuly', () => {
            const address = contract.address;
            console.log('Contract address:', address);

            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        });

        it('has a name [DreamWear]', async () => {
            const name = await contract.name();
            assert.equal(name, 'DreamWear');
        });

        it('has a symbol [DW]', async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'DW');
        });
    });
});