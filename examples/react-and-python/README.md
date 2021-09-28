# Smartpay Example: react-and-python

Before start the service, make sure you filled the API keys to replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` in corresponding files.

To start the services, just execute the `start.sh` at root of each example folder:

```bash
bash start.sh
```

If the service didn't run up successfully, you can follow the instructions below to start each service separately.

## How to Build Front-end Bundle

Install dependencies:

```bash
yarn install
```

Fill the API key to replace `<YOUR_PUBLIC_API_KEY>` in `App.js`

Build:

```bash
yarn build
```

## How to Start the Server

Install dependencies:

```bash
pip3 install --user -r requirements.txt
```

Fill the API key to replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` in `server.py`

Start dev server:

```bash
FLASK_APP=server flask run
```
