#!/usr/bin/env python3
from eth_account import Account
from web3 import Web3
import secrets
import random
import sys

# A script to set up delegating a list of addresses for governance between 2 different DAOs.
#
# Originally written as a way to set up competing teams for an on Chain Connect 4 demo
# for Eth Denver 2023.
#
# Requires installing web3py: https://web3py.readthedocs.io/en/stable/quickstart.html
#
# And used via the command:
#
# `python3 dao_compete_setup.py`
#
# The script requires a `dao_compete_config.txt` file, which will need to have the following lines:
#
#   {infuraAPIKey} - an API key for https://www.infura.io/
#   {executionPrivateKey} - your wallet private key to execute the transactions with
#   {dao1TokenAddress} - the address of the first DAO's ERC20Votes token
#   {dao2TokenAddress} - the address of the second DAO's ERC20Votes token
#   {participantVotingPower} - how many voting tokens (as a whole number) to send to each participant
#   {participantEth} - an amount of Goerli Eth to send to each participant, so they can execute transactions
#   {participantAddresses}... - Zero or more wallet addresses of the participants, if there are none, the user
#       will be prompted to input addresses via the command line
#
# !!! be careful not to commit the dao_compete_config.txt file, as it contains your wallet private key !!!

ERC20_VOTES_ABI = '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Snapshot","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"snapshotId","type":"uint256"}],"name":"balanceOfAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"captureSnapShot","outputs":[{"internalType":"uint256","name":"snapId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint32","name":"pos","type":"uint32"}],"name":"checkpoints","outputs":[{"components":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint224","name":"votes","type":"uint224"}],"internalType":"struct ERC20VotesUpgradeable.Checkpoint","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"initializeParams","type":"bytes"}],"name":"setUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"snapshotId","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
DELEGATION_GAS = 0.01
TIMEOUT_SECONDS = 10 * 60

def main():

    setupFile = open('dao_compete_config.txt', 'r')
    infuraAPIKey = setupFile.readline().strip()
    executionPrivateKey = setupFile.readline().strip()
    dao1TokenAddress = setupFile.readline().strip()
    dao2TokenAddress = setupFile.readline().strip()
    participantVotingPower = setupFile.readline().strip()
    participantEth = setupFile.readline().strip()
    participantAddresses = setupFile.readlines()
    setupFile.close()

    # if there are no participant addresses, ask the user to input them.
    # this allows the script to be used on the day of the event to put 
    # a single player into the game on the fly
    if len(participantAddresses) == 0:
        participantAddresses = input('Enter comma delimited participant addresses: ').split(',')

    web3 = Web3(Web3.HTTPProvider(f'https://goerli.infura.io/v3/{infuraAPIKey}'))
    executionAccount = Account.from_key(executionPrivateKey)
    random.shuffle(participantAddresses)
    tokenContract1 = web3.eth.contract(dao1TokenAddress, abi=ERC20_VOTES_ABI)
    tokenContract2 = web3.eth.contract(dao2TokenAddress, abi=ERC20_VOTES_ABI)

    team1 = []
    team2 = []
    failures = open('failures.txt', 'w')

    # randomize which team we start with, since we might need to run the script a few
    # times to catch failures, and on the event day we don't want every person added
    # to the same team
    teamModulus = random.randint(0, 1)

    for index, participantAddress in enumerate(participantAddresses):

        participantAddress = participantAddress.strip()

        print('--- Starting ' + participantAddress + ' ---')

        # create a new account we'll delegate to the participant from
        account = createAccount()

        # send a bit of Eth to this new account, to pay gas for the delegation
        try:
            sendEth(web3, executionAccount.address, executionPrivateKey, account[0].address, DELEGATION_GAS)
        except Exception as e:
            logFailure(e, failures, participantAddress)
            continue

        # send voting tokens to this new account
        erc20Contract = tokenContract1 if index % 2 == teamModulus else tokenContract2
        try:
            sendErc20(web3, erc20Contract, executionAccount.address, executionPrivateKey, account[0].address, participantVotingPower)
        except Exception as e:
            logFailure(e, failures, participantAddress)
            continue

        # delegate these voting to the participant from our new account
        try:
            delegateErc20(web3, erc20Contract, account[0].address, account[1], participantAddress)
        except Exception as e:
            logFailure(e, failures, participantAddress)
            continue

        # add the participant to the team array, which we'll output at the end
        team = team1 if index % 2 == teamModulus else team2
        team.append(participantAddress + '\n')

        # send the participant some Eth to play the game with
        try:
            sendEth(web3, executionAccount.address, executionPrivateKey, participantAddress, participantEth)
        except Exception as e:
            logFailure(e, failures, participantAddress + ' (delegated, needs Eth)')
            continue

        print('--- Finished ' + participantAddress + ' ---')

    failures.close()
    teams = open('teams.txt', 'w')
    teams.write('Team 1\n')
    teams.writelines(team1)
    teams.write('Team 2\n')
    teams.writelines(team2)
    teams.close()
    
    print('--- Script completed! ---')

def createAccount():
    privateKey = '0x' + secrets.token_hex(32)
    account = Account.from_key(privateKey)
    print('Generated wallet address: ' + account.address)
    return account, privateKey

def sendEth(web3, fromAddress, fromKey, toAddress, decimalAmount):
    signed_tx = web3.eth.account.sign_transaction({
        'chainId': 5,
        'nonce': web3.eth.getTransactionCount(fromAddress),
        'to': toAddress,
        'value': web3.toWei(decimalAmount, 'ether'),
        'gas': 21000,
        'maxFeePerGas': web3.eth.fee_history(1, 'pending').baseFeePerGas[0] + 2 * web3.eth.max_priority_fee,
        'maxPriorityFeePerGas': 2 * web3.eth.max_priority_fee,
    }, fromKey)
    # send transaction
    tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
    print('Sending Eth: ' + etherScanLink(tx_hash))
    web3.eth.wait_for_transaction_receipt(tx_hash, timeout=TIMEOUT_SECONDS)
    print('Sending Eth complete!')

def sendErc20(web3, contract, fromAddress, fromKey, toAddress, amount):
    signed_tx = web3.eth.account.sign_transaction({
        'chainId': 5,
        'nonce': web3.eth.getTransactionCount(fromAddress),
        'to': contract.address,
        'from': fromAddress,
        'gas': 150000,
        'maxFeePerGas': web3.eth.fee_history(1, 'pending').baseFeePerGas[0] + 2 * web3.eth.max_priority_fee,
        'maxPriorityFeePerGas': 2 * web3.eth.max_priority_fee,
        'value': '0x0',
        'data': contract.encodeABI('transfer', args=(toAddress, web3.toWei(amount, 'ether'))), # assuming 18 decimals
    }, fromKey)
    tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
    print('Sending ERC20: ' + etherScanLink(tx_hash))
    web3.eth.wait_for_transaction_receipt(tx_hash, timeout=TIMEOUT_SECONDS)
    print('Sending ERC20 complete!')

def delegateErc20(web3, contract, fromAddress, fromKey, toAddress):
    signed_tx = web3.eth.account.sign_transaction(contract.functions.delegate(toAddress).buildTransaction({
        'chainId': 5,
        'nonce': web3.eth.getTransactionCount(fromAddress),
        'from': fromAddress,
        'gas': 100000,
        'maxFeePerGas': web3.eth.fee_history(1, 'pending').baseFeePerGas[0] + 2 * web3.eth.max_priority_fee,
        'maxPriorityFeePerGas': 2 * web3.eth.max_priority_fee,
        'value': '0x0',
    }), fromKey)
    tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
    print('Delegating ERC20: ' + etherScanLink(tx_hash))
    web3.eth.wait_for_transaction_receipt(tx_hash, timeout=TIMEOUT_SECONDS)
    print('Delegating complete!')

def etherScanLink(tx_hash):
    return f'https://goerli.etherscan.io/tx/{tx_hash}'

def logFailure(exception, output, message):
    print(str(exception))
    output.write(message + '\n')

main()