# Smartpay Example: integrate with react-and-node

## Prerequisites

### Register and apply for your own API keys

Replace `<YOUR_SECRET_KEY>` and `<YOUR_PUBLIC_KEY>` with your own keys wherever necessary in the code.

### Make sure you have Node.js v14+ installed

Even if you do not intend to use Node as your back-end language, having `Node.js v14+` would ensure a smooth experience to get our example code up and running.

If you don't already have it installed in your machine, we recommend using [nvm](https://github.com/nvm-sh/nvm).

Follow the official guide to install `nvm` properly, then:

```shell
nvm install --lts 14
nvm use --lts 14
```

To ensure you are using the correct version:

```shell
node -v
```


## Get started

### Automated

As we mentioned above, having `Node.js v14` in place will make it a lot easier to get this example up and running by simply executing:

```shell
npm run start
```

### Manual

If this doesn't work out for you, try the following steps manually.

You will need to get `BOTH` frontend and backend servers running simutaneously for this example to work.

In the following steps, `<PROJECT_ROOT>` refers to the root of this example project (where `client` and `server` directories reside in).

### Frontend (pre-bundled)

```shell
npx serve -p 8080 build
```

### Backend

```shell
npm install && npm run start
```
