#!/bin/sh

npm install --no-fund --no-audit && PORT=3080 REACT_APP_PUBLIC_KEY=$PUBLIC_KEY npm run start