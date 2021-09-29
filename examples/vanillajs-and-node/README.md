# Smartpay Example: integrate with vanillajs-and-node

## Prerequisites

### Register and apply for your own API keys

Replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` with your own keys wherever necessary in the code.### Nodejs v14 LTS installed with PATH properly configured

If you don't already have it installed in your machine, we recommend using [nvm](https://github.com/nvm-sh/nvm).

Follow the official guide to install `nvm` properly, then:


```shell
nvm install --lts 14
nvm use --lts 14
```
## Get started

### Automated script

```bash
bash start.sh
```

If this doesn't work out for you, try the following steps manually.

You will need to get `BOTH` frontend and backend servers running to make this example project work.

In the following steps, `<PROJECT_ROOT>` refers to the root of this example project (where `client` and `server` directories exist).

### Frontend (pre-bundled)

```shell
npm i -g serve # or yarn global add serve
serve -p 8080 build
```
### Backend

```shell
yarn && yarn start
```