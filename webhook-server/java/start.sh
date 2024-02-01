#!/usr/bin/env sh
set -eu
directory=$(dirname -- "$0"; printf .)
cd -- "${directory%?.}"
./gradlew run
