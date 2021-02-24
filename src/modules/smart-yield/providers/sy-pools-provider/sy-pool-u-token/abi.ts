const ABI: any[] = [
  {
    name: 'name',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    name: 'decimals',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    name: 'symbol',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    name: 'allowance',
    type: 'function',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'approve',
    type: 'function',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
];

export default ABI;
