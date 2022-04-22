const express = require("express")
const faucet = require("./faucet")
const { log, connect } = require("./util")
const {
  faucet: { PORT }
} = require("./package.json")

async function main() {
  const server = express()
  const { circuit, bot } = await connect()
  server.use(express.static("app"))
  server.get("/api/:to", faucet.bind(null, circuit, bot))
  server.listen(PORT, "localhost", () => log.info(`🛸 localhost:${PORT}`))
}

main()
