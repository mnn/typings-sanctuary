#!/usr/bin/env bash
set -e
mkdir -p node_modules/@types/sanctuary
cd node_modules/@types/sanctuary
wget https://github.com/mnn/typings-sanctuary/raw/master/sanctuary/index.d.ts
wget https://github.com/mnn/typings-sanctuary/raw/master/sanctuary/sanctuary-types.d.ts
echo "Installed successfully."
