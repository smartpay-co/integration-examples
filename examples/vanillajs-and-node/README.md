# Smartpay Example: vanillajs-and-node

Before start the service, make sure you filled the API keys to replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` in corresponding files.

To start the services, just execute the `start.sh` at root of each example folder:

```bash
bash start.sh
```

If the service didn't run up successfully, you can follow the instructions below to start each service separately.

## How to Build Front-end Bundle

Fill the API key to replace `<YOUR_PUBLIC_API_KEY>` in `client.js`

Use python:

```bash
python3 -m http.server 8080 -d build
```

Or use node:

```bash
npm i -g serve
serve -p 8080 build
```

## How to Start the Server

Install dependencies:

```bash
yarn install
```

Fill the API key to replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` in `server.js`

Start dev server:

```bash
yarn start
```
