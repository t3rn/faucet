###############################################################################
# test suite
###############################################################################

source <(curl -sSf https://raw.githubusercontent.com/chiefbiiko/bashert/v1.1.0/bashert.sh)

test_get_coins_202() {
  echo "test_get_coins_202"

  resp_head="$(mktemp)"
  resp_body="$(mktemp)"

  curl -sS \
    -D $resp_head \
    $API_URL/$BOB \
  > $resp_body

  assert_status $resp_head 202
}

test_get_coins_400() {
  echo "test_get_coins_400"

  resp_head="$(mktemp)"
  resp_body="$(mktemp)"

  curl -sS \
    -D $resp_head \
    $API_URL/5fraud \
  > $resp_body

  assert_status $resp_head 400
}

test_get_coins_429() {
  echo "test_get_coins_429"

  resp_head="$(mktemp)"
  resp_body="$(mktemp)"

  curl -sS \
    -D $resp_head \
    $API_URL/$BOB \
  > $resp_body

  assert_status $resp_head 429
}

###############################################################################
# test runner
###############################################################################

cleanup() {
  kill $circuit_pid
  kill $api_pid
  mv ./api/package.backup.json ./api/package.json
  mv ./api/.secret.backup.json ./api/.secret.json
}

trap 'cleanup' EXIT

BOB=5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
API_URL=http://localhost:$(jq -r .faucet.PORT ./api/package.json)/api

cd ./api
cp ./package.json ./package.backup.json
jq ".faucet.BLACKLIST_SECONDS=3" \
  ./package.json \
> ./package.tmp.json
jq ".faucet.PROVIDER=\"ws://localhost:3333\"" \
  ./package.tmp.json \
> ./package.tmp2.json 
mv ./package.tmp2.json ./package.json
rm ./package.tmp.json
cp ./.secret.json ./.secret.backup.json 
jq '.BOT_MNEMONIC="bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"' \
  ./.secret.json \
> ./.secret.tmp.json 
mv ./.secret.tmp.json ./.secret.json
cd ..

cargo build --manifest-path ../t3rn/node/standalone/Cargo.toml

cargo run \
  --manifest-path ../t3rn/node/standalone/Cargo.toml \
  -- \
  --dev \
  --ws-port 3333 \
> /dev/null 2>&1 &
circuit_pid=$!

sleep 33s

npm start --prefix ./api &
api_pid=$!

sleep 3s

test_get_coins_202
sleep 3s # await blacklist ttl
test_get_coins_400
test_get_coins_429

killall node # kill -9 $api_pid
kill -9 $circuit_pid