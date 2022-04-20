const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const Token1 = artifacts.require("Token1");
const Token2 = artifacts.require("Token2");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(UniswapV2Factory, accounts[0]);
  const factory = await UniswapV2Factory.deployed();

  let tokenAddress1, tokenAddress2;

  if (network === 'mainnet') {
    tokenAddress1 = '';
    tokenAddress2 = '';
  } else {
    await deployer.deploy(Token1);
    await deployer.deploy(Token2);
    const token1 = await Token1.deployed();
    const token2 = await Token2.deployed();
    tokenAddress1 = token1.address;
    tokenAddress2 = token2.address;
  }

  await factory.createPair(tokenAddress1, tokenAddress2);
};
