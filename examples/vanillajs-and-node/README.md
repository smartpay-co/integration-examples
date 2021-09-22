# Smartpay Example: vanillajs-and-node

To start the services, just execute the `start.sh` at root of each example folder:

```bash
bash start.sh
```

If the service didn't run up successfully, you can follow the instructions below to start each service separately.

## How to Build Front-end Bundle

Use python:

```bash
python -m http.server 8080 -d build
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

Start dev server:

```bash
yarn start
```
