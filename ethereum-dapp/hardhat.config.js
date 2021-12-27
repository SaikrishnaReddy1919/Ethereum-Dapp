require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths : {
    artifacts : "./src/artifacts" //ABI to import to react files
  },
  networks : {
    hardhat : {
      chainId : 1337
    },
    ropsten : {
      url : "https://ropsten.infura.io/v3/8881bc37186e47b39264501765003f04",
      accounts : [`<Add_YOUR_PRIVATE_KEY_HERE`]
    }
  }
};
