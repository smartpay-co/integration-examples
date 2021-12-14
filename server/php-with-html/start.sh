#!/bin/sh

composer -q install && php -S 127.0.0.1:5000 server.php
