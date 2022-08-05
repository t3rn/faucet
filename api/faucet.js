const { log, isAddress, TmpBlacklist } = require("./util")
const {
  faucet: { AMOUNT }
} = require("./package.json")

const tmpBlacklist = new TmpBlacklist()

let nonce

module.exports = async function faucet(circuit, bot, req, res) {
  const ip = (req.headers["x-real-ip"] || req.ip).split(":").pop()
  const to = req.params.to

  if (tmpBlacklist.hasSome(to, ip)) return res.sendStatus(429)
  else tmpBlacklist.add(to, ip)

  if (!isAddress(to)) return res.sendStatus(400)

  if (!nonce) {
    const res = await circuit.query.system.account(bot.address)
    nonce = BigInt(res.nonce.toString())
  }

  nonce = nonce + 1n

  log.info(`[${ip}] transferring ${AMOUNT / 10**12}T0RN to ${to} ...`)

  await circuit.tx.balances
    .transfer(to, AMOUNT)
    .signAndSend(bot, { nonce }, ({ events = [], status }) => {
      log.info(`[${ip}] transfer status ${status}`)
      if (events.length) {
        events.forEach(e => log.info(`[${ip}] event ${JSON.stringify(e)}`))
      }
      if (status.isInBlock) {
        log.info(`[${ip}] in block#${status.asInBlock.toHex()}`)
        res.status(202).send({ blockHash: status.asInBlock.toHex() })
      }
    })
}
