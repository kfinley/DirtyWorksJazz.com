#!/bin/bash

echo
echo 'Running dev initialization script...'
echo

# Run npm install
if ! [ -d './node_modules' ]; then
    npm npm install
else
    echo "Node Modules exists... skipping install."
fi

echo
echo 'Restarting containers...'
npm run containers:restart

echo
echo -e Dev setup complete! "\xF0\x9f\x8d\xba"
