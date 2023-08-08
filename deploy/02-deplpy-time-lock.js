const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { MIN_DELAY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("_______________________Deploy time lock___________________________")

  const args = [MIN_DELAY, [], [], deployer]
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, args)
  }
}

module.exports.tags = ["all", "timeLock"]
