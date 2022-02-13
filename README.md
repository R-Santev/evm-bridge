# EVM compatible ERC-20 tokens Bridge

The project represents a basic implementation of an EVM compatible Bridge, which suports erc-20 tokens.

**Important!** Bridge validators are currently not implemented and this is alfa demo version of the bridge contracts. Don't use in production!

## How it works?

Tokens supply is adjusted by 4 main functions:

1. Lock - The tokens of the user are transfered to the Bridge contract and locked in it.
2. Mint - The locked on the first chain tokens are minted on the other chain.
3. Burn - The prevously minted amount of tokens is burned on the target chain.
4. Unlock - The Burned tokens are unlocked on the source chain.

## Fees

Fixed fees apply in the first and fourth step

## Check Hardhat for information about the local development
