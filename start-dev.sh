#!/bin/bash
export PATH="/Users/f.schuessler/.nvm/versions/node/v24.15.0/bin:$PATH"
cd /Users/f.schuessler/kochelino-app
exec node node_modules/.bin/next dev --port 3002 --webpack
