#!/bin/sh

composer -q install && php -S 127.0.0.1:5001 server.php
