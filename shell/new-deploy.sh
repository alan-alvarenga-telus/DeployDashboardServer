#!/bin/bash
ROOT="/work/users/fomc"
UI="$ROOT/CustOM/src/ui"
BUILD="$UI/build"
BUILD_PID="$(ps -x | grep server.js | grep node | awk '{print $1}')"
echo "Kill signal sent to FOMC PID: $BUILD_PID"
kill "$BUILD_PID"
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
PORT=8383 node server.js & disown
echo "FOMC started successfuly"