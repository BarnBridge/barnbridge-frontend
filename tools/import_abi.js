require('dotenv').config({
  path: '.env.development.local',
});

const fs = require('fs').promises;
const Axios = require('axios').default;

const TARGET_FOLDER = 'src/web3/abi';

const axios = Axios.create({
  baseURL: 'http://api-kovan.etherscan.io',
});

function loadABI(name, address) {
  console.info(`Loading ${name} ABI...`);

  return axios.get('/api', {
    params: {
      module: 'contract',
      action: 'getabi',
      format: 'raw',
      address,
    },
  }).then(({data}) => {
    return fs.writeFile(`${TARGET_FOLDER}/${name}.json`, JSON.stringify(data), 'utf8');
  }).catch(error => {
    console.error(error);
  });
}

function delay() {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
}

function PromiseSequence(tasks, cb) {
  const results = [];

  return tasks
    .reduce(
      (p, task, index) =>
        p
          .then(() => cb(task, index, tasks))
          .then(result => results.push(result))
          .catch(err => results.push(Promise.reject(err))),
      Promise.resolve()
    )
    .then(() => results);
}

(async () => {
  PromiseSequence([
    // ['dai', process.env.REACT_APP_CONTRACT_DAI_ADDR],
    // ['usdc', process.env.REACT_APP_CONTRACT_USDC_ADDR],
    // ['susd', process.env.REACT_APP_CONTRACT_SUSD_ADDR],
    // ['bond', process.env.REACT_APP_CONTRACT_BOND_ADDR],
    // ['uniswap_v2', process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR],
    // ['staking', process.env.REACT_APP_CONTRACT_STAKING_ADDR],
    // ['community_vault', process.env.REACT_APP_CONTRACT_COMMUNITY_VAULT_ADDR],
    // ['yield_farm', process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR],
    // ['yield_farm_lp', process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR],
    // ['yield_farm_bond', process.env.REACT_APP_CONTRACT_YIELD_FARM_BOND_ADDR],
    // ['dao_governance', process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR],
    // ['dao_reward', process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR],
    // ['sy', process.env.REACT_APP_CONTRACT_SY_ADDR],
    // ['sy_controller', process.env.REACT_APP_CONTRACT_SY_CONTROLLER_ADDR],
  ], ([name, address]) => {
    return loadABI(name, address).then(delay);
  });
})();
