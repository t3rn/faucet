# Faucets

All available faucets for t3rn test networks

# t0rn (Rococo Parachain) faucet

Access via https://faucet.t0rn.io

`React`+`express`+`nginx` powered faucet for the `t0rn` parachain on Rococo 🚿

## Deployment

Deployment is done automatically on merge to `main`.  

Both `api` and `app` are packaged in docker image and pushed to ECR.  
After successful build `helm` chart is deployed in K8S cluster. 

Note: Helm chart default values are in file [values-t0rn-faucet.yaml](./helm/values-t0rn-faucet.yaml) and image tags are added dynamically during Github Actions Workflow.