#!/bin/sh

pip3 install -q --user -r requirements.txt && FLASK_APP=server flask run --host=127.0.0.1 --port=5000