const express = require("express")
const cors = require("cors")
const faucet = require("./faucet")
const { log, connect } = require("./util")
const {
  faucet: { PORT }
} = require("./package.json")

async function main() {
  const server = express()
  const { circuit, bot } = await connect()
  server.get("/:to", cors(), faucet.bind(null, circuit, bot))
  server.listen(PORT, "0.0.0.0", () => log.info(`http://0.0.0.0:${PORT}`))
}

main()
