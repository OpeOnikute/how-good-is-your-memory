#! /bin/bash
apt-get update && apt install lldb-4.0 liblldb-4.0-dev -y
npm install -g --unsafe-perm llnode
apt-get install gdb -y
ulimit -c unlimited