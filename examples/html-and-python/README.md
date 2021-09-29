# Smartpay Example - integrate with HTML and Python

## Prerequisites

### Register and apply for your own API keys

Replace `<YOUR_PRIVATE_API_KEY>` and `<YOUR_PUBLIC_API_KEY>` with your own keys wherever necessary in the code.

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

You will need to get `BOTH` frontend and backend servers running to make this example project work.

In the following steps, `<PROJECT_ROOT>` refers to the root of this example project for `html-and-python` (where `client` and `server` directories exist).

### Frontend (pre-bundled)

```shell
cd <PROJECT_ROOT>/client
python3 -m http.server 8080 -d build
```

### Backend

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

### Congratulations!

Now you can open [http://localhost:8080/](http://localhost:8080/) and try it out.
