# BarnBridge Frontend
![](https://i.imgur.com/E1SVjUa.png)

[![Prod](https://github.com/BarnBridge/barnbridge-frontend/actions/workflows/prod.yml/badge.svg)](https://github.com/BarnBridge/barnbridge-frontend/actions) [![Testnet](https://github.com/BarnBridge/barnbridge-frontend/actions/workflows/testnet.yml/badge.svg)](https://github.com/BarnBridge/barnbridge-frontend/actions)

BarnBridge is a DeFi risk tokenization protocol for hedging factors like yield sensitivity or market price. This github repository contains the React (Typescript) front-end user interface for: https://app.barnbridge.com/

Interested in learning more about BarnBridge? Read our [Developer Guides](https://integrations.barnbridge.com/) for more information.

## Setting up your local environment

1. Ensure that you have Node.js 12.x installed. We also recommend installing Node version manager `nvm` to allow you to switch your Node environment versions. 
2. `npm install` to install all dependencies  
4. Run the app using one of our start scripts such as `npm run start:testnet` scripts (as declared on `package.json`)
5. This will open the app on your web browser on `https://localhost:3000`

Ensure that you have the appropriate `.env.*` configuration file. In the file, note that the app utilises Infura.io to connect to the Ethereum network which requires an API key. 

Having trouble? Please contact us on [Discord](https://discord.gg/FfEhsVk) or read our [Developer Guides](https://integrations.barnbridge.com/) for more information.

### Available Start Scripts

* `npm run start:testnet` Public testnet environment 
* `npm run start:alpha` Alpha environment (connecting to Ethereum mainnet)

## Discussion
For any concerns or questions, open an issue on GitHub or visit us on [Discord](https://discord.gg/9TTQNUzg) to discuss.
For security concerns, please email info@barnbridge.com.

Copyright 2021 BarnBridge DAO
