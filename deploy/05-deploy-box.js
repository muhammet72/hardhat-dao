const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  log("____________________Deploy Box______________________________")

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }

  const timeLock = await get("TimeLock")
  const boxContract = await ethers.getContractAt("Box", box.address)
  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
  await transferOwnerTx.wait(1)
  log("DONE.........................^^^")
}

module.exports.tags = ["all", "timeLock"]
