# Faucets

All available faucets for t3rn test networks

# t0rn (Rococo Parachain) faucet

Access via https://dev.net.t3rn.io/faucet

`React`+`express`+`nginx` powered faucet for the `t0rn` parachain on Rococo 🚿

<!-- ## Deploy

`nginx` rouing should have been configured manually.

```bash
user_at_machine=helllo@1.2.3.4
npm run build --prefix app
scp -r ./app/build/* $user_at_machine:/var/www/dev.net.t3rn.io/faucet/
rm -r ./api/node_modules
scp ./api/* $user_at_machine:/home/atlas/rococo/t0rn-faucet-api/
scp ./api/.secret.json $user_at_machine:/home/atlas/rococo/t0rn-faucet-api/.secret.json
scp ./api.service $user_at_machine:/home/atlas/.config/systemd/user/t0rn-faucet-api.service
ssh $user_at_machine 'systemctl --user stop t0rn-faucet-api.service'
ssh $user_at_machine 'systemctl --user disable t0rn-faucet-api.service'
ssh $user_at_machine 'systemctl --user enable t0rn-faucet-api.service'
ssh $user_at_machine 'systemctl --user start t0rn-faucet-api.service'
``` -->
