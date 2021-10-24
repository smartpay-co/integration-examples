# Smartpay Example: integrate with html-and-python

## Prerequisites

### Prepare your own API keys

If you don't already have it, you can find your credentials at the `settings > credentials` page on your [dashboard](https://dashboard.smartpay.co/settings/credentials).

### Make sure you have Node.js v14+ installed

You can make sure of it by executing:

```shell
node -v
```

Even if you do not intend to use Node as your back-end language, having `Node.js v14+` would ensure a smooth experience to get our example code up and running.

If you already have it in place, you can skip the following and go directly to [get started](#get-started).

If you don't, we recommend using [nvm](https://github.com/nvm-sh/nvm).

Follow the official guide to install `nvm` properly, then:

```shell
nvm install --lts 14
nvm use --lts 14
```
### Python v3.4+ with pip installed

We recommend the latest version (v3.9.7 at the time of writing).

#### Install Python v3.9.x

**MacOS**

We recommend using [Homebrew](https://brew.sh/).

```shell
brew install python@3.9
brew link python3
```

**Windows**

1. Download: [32-bit](https://www.python.org/ftp/python/3.9.7/python-3.9.7.exe) | [64-bit](https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe)
2. Follow the [official guide](https://docs.python.org/3/using/windows.html) for installation.

## Get started

### Automated

Assuming you have Node.js v14+ now, the last step for you is to:

```shell
npm run start
```

> :warning: Please note that it could take a while for everything to be configured & installed.

then, after the build is finished, **visit [http://localhost:3080](http://localhost:3080)**.

---

### Manual

If this doesn't work out for you, try the following steps manually.

You will need to get `BOTH` frontend and backend servers running simutaneously for this example to work.

In the following steps, `<PROJECT_ROOT>` refers to the root of this example project (where `client` and `server` directories reside in).

### Client

```shell
npm run start
```

### Server

```shell
cd <PROJECT_ROOT>/server

# virtualenv
python3 -m venv smartpay-env
source smartpay-env/bin/activate # if you are on Windows: smartpay-env\Scripts\activate.bat

# install the required packages
python3 -m pip install -r requirements.txt

# run the flask server
FLASK_APP=server python3 -m flask run
```
