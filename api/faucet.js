const { log, isAddress, TmpBlacklist } = require("./util")
const {
  faucet: { AMOUNT }
} = require("./package.json")

const tmpBlacklist = new TmpBlacklist()

module.exports = async function faucet(circuit, bot, req, res) {
  const ip = (req.headers["x-real-ip"] || req.ip).split(":").pop()
  const to = req.params.to

  if (tmpBlacklist.hasSome(to, ip)) return res.sendStatus(429)
  else tmpBlacklist.add(to, ip)

  if (!isAddress(to)) return res.sendStatus(400)

  const hash = await circuit.tx.balances.transfer(to, AMOUNT).signAndSend(bot)

  log.info(`[${ip}] transfer(${to},${AMOUNT}) => ${hash.toHex()}`)

  res.status(202).send({ tx: hash.toHex() })
}
