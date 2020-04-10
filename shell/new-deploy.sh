#!/bin/bash
ROOT="/apps/infra/ocelot/CustOM-FIFAOrderManagementConsole"
UI="$ROOT/src/ui"
BUILD="$UI/build"
BUILD_PID="$(pm2 list | grep fomc-middleware-8383 | awk '{print $12}')"
echo "Kill signal sent to FOMC PID: $BUILD_PID"
pm2 stop 0
echo "Shutdown complete"
echo "Pulling new version"
eval "$(ssh-agent -s)"
ssh-add /work/users/naasdvpoc/.ssh/id_rsa
cd "$UI"
git pull --no-edit
echo "Building new version ..."
cd "$BUILD"
npm run build
echo "Build completed successfuly"
echo "all hail the new version"
echo "Starting app ..."
pm2 start 0
echo "FOMC started successfuly"