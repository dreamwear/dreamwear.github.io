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

    describe('compliance', () => {
        it('is compliant with ERC165 interface', async () => {
            const isCompliant = await contract.supportsInterface('0x01ffc9a7');
            assert.ok(isCompliant);
        });

        it('is compliant with ERC721 interface', async () => {
            const isCompliant = await contract.supportsInterface('0x80ac58cd');
            assert.ok(isCompliant);
        });

        it('is compliant with ERC721Metadata interface', async () => {
            const isCompliant = await contract.supportsInterface('0x5b5e139f');
            assert.ok(isCompliant);
        });

        it('is compliant with ERC721Enumerable interface', async () => {
            const isCompliant = await contract.supportsInterface('0x780e9d63');
            assert.ok(isCompliant);
        });
    });

    describe('minting', () => {
        it('creates a new dream', async () => {
            const result = await contract.mint('https://...0');
            const totalSupply = await contract.totalSupply();

            assert.equal(totalSupply, 1);

            const event = result.logs[0].args;

            assert.equal(event._from, '0x0000000000000000000000000000000000000000');
            assert.equal(event._to, accounts[0]);
            assert.equal(event._tokenId, 0);
        });

        it('rejects existing dream', async () => {
            await contract.mint('https://...0').should.be.rejected;
        });
    });

    describe('indexing', () => {
        it('lists dreams', async () => {
            await contract.mint('https://...1');
            await contract.mint('https://...2');
            await contract.mint('https://...3');

            const totalSupply = await contract.totalSupply();

            let i = 0, dream;
            while (i < totalSupply) {
                dream = await contract.dreams(i);
                assert.equal(dream, `https://...${i}`);
                i++;
            };
        });
    });
});