const ABI: any[] = [
  {
    "name": "name",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
      }
    ]
  },
  {
    "name": "decimals",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
      }
    ]
  },
  {
    "name": "totalSupply",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "balanceOf",
    "type": "function",
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "controller",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
      }
    ]
  },
  {
    "name": "pool",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
      }
    ]
  },
  {
    "name": "juniorBond",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
      }
    ]
  },
  {
    "name": "seniorBond",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
      }
    ]
  },
  {
    "name": "abondDebt",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "abondGain",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "abondPaid",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "juniorBondId",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "seniorBondId",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "tokensInJuniorBonds",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "underlyingJuniors",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "underlyingLiquidatedJuniors",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "underlyingLoanable",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "underlyingTotal",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "price",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
      }
    ]
  },
  {
    "name": "buyTokens",
    "type": "function",
    "inputs": [
      {
        "name": "underlyingAmount_",
        "type": "uint256"
      },
      {
        "name": "minTokens_",
        "type": "uint256"
      },
      {
        "name": "deadline_",
        "type": "uint256"
      }
    ],
    "outputs": [],
  },
  {
    "name": "buyBond",
    "type": "function",
    "inputs": [
      {
        "name": "principalAmount_",
        "type": "uint256"
      },
      {
        "name": "minGain_",
        "type": "uint256"
      },
      {
        "name": "deadline_",
        "type": "uint256"
      },
      {
        "name": "forDays_",
        "type": "uint16"
      }
    ],
    "outputs": [],
  },
  {
    "name": "buyJuniorBond",
    "type": "function",
    "inputs": [
      {
        "name": "tokenAmount_",
        "type": "uint256"
      },
      {
        "name": "maxMaturesAt_",
        "type": "uint256"
      },
      {
        "name": "deadline_",
        "type": "uint256"
      }
    ],
    "outputs": [],
  },
  {
    "name": "abond",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "principal",
        "type": "uint256"
      },
      {
        "name": "gain",
        "type": "uint256"
      },
      {
        "name": "issuedAt",
        "type": "uint256"
      },
      {
        "name": "maturesAt",
        "type": "uint256"
      },
      {
        "name": "liquidated",
        "type": "bool"
      }
    ],
  },
  {
    "name": "sellTokens",
    "type": "function",
    "inputs": [
      {
        "name": "tokenAmount_",
        "type": "uint256"
      },
      {
        "name": "minUnderlying_",
        "type": "uint256"
      },
      {
        "name": "deadline_",
        "type": "uint256"
      }
    ],
    "outputs": [],
  },
  {
    "name": "redeemJuniorBond",
    "type": "function",
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jBondId_",
        "type": "uint256"
      }
    ],
    "outputs": [],
  },
  {
    "name": "redeemBond",
    "type": "function",
    "inputs": [
      {
        "name": "bondId_",
        "type": "uint256"
      }
    ],
    "outputs": [],
  },
  {
    "name": "juniorBonds",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "tokens",
        "type": "uint256"
      },
      {
        "name": "maturesAt",
        "type": "uint256"
      }
    ],
  },
];

export default ABI;
