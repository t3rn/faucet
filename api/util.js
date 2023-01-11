const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api")
const { checkAddress, cryptoWaitReady } = require("@polkadot/util-crypto")
const BOT_MNEMONIC = process.env.BOT_MNEMONIC.trim()
const {
  faucet: { SS58_PREFIX, PROVIDER, BLACKLIST_SECONDS }
} = require("./package.json")

class TmpBlacklist extends Set {
  static ttl = parseInt(BLACKLIST_SECONDS) * 1000
  add(...items) {
    items.forEach(item => super.add(item))
    const t = setTimeout(
      () => items.forEach(item => super.delete(item)),
      TmpBlacklist.ttl
    )
    if (typeof t.unref === "function") t.unref()
  }
  hasSome(...items) {
    return items.some(item => super.has(item))
  }
}

const log = {
  info(...args) {
    console.log(`\x1b[94mINFO\x1b[0m [${new Date().toISOString()}] 💎`, ...args)
  },
  error(...args) {
    console.error(
      `\x1b[31mERROR\x1b[0m [${new Date().toISOString()}] 🔥`,
      ...args
    )
  }
}

function isAddress(x) {
  return checkAddress(x, SS58_PREFIX)[0] || false
}

async function connect(url) {
  await cryptoWaitReady()
  return {
    circuit: await ApiPromise.create({
      provider: new WsProvider(url || PROVIDER)
    }),
    bot: new Keyring({ type: "sr25519" }).addFromUri(BOT_MNEMONIC)
  }
}

module.exports = {
  TmpBlacklist,
  log,
  isAddress,
  connect
}
