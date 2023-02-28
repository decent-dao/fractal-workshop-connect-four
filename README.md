# Fractal Connected

Do more with DAOs...like play games. With the power of simple decisions made in collaboration (or solo if you really want to). This app is for viewing purposes only. It reads events and data from on-chain [Smart Contracts](https://github.com/decent-dao/fractal-demos-contracts/blob/main/contracts/ConnectFour/ConnectFour.sol) and displays the game progress in real time.

## Supported Chains
- Goerli Testnet

## Useful Links
- [Fractal Framework](https://app.dev.fractalframework.xyz/)

## Season Address
Located at the top of the site [Fractal Connect Four](https://c4.fractalframework.xyz/). This will be used to interact with the current game along with the game id.

## Play as a DAO

If you are not a member of a DAO and would like to create your own using the Fractal Framework visit [Fractal Framework](https://app.dev.fractalframework.xyz/).

There are two main commands for Connect 4 gameplay:

`Challenge`: Opponent can be a Safe address or any other DAO or account address that is able to interact with smart contracts.
```shell
Target Address = [current season address]
Function Name = challenge
Function Signature = address opponent
```

```shell
Target Address = [current season address]
Function Name = makeMove
Function Signature = uint8 gameId, uint8 column
```
## Playing solo
We love collaboration, but if you would just like to play Connect 4 without a DAO, you can challenge and interact with the contract via the verified code on Etherscan.

## Gameplay
### FAQs
- Who goes first?
- - Turns occur as each player makes a move starting with Team two, since Team one is who challenged.