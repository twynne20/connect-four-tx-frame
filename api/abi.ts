export const abi = [
  {
    inputs: [
      {
        "name": "_betAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_betToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_openToPublic",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "_specificAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    name: 'createGame',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        "name": "_gameId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_column",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    name: 'makeMove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  }
] as const