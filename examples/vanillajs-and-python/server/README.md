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
