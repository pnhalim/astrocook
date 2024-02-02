#!/bin/bash

# back end setup
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# front end setup
cd ./frontend
npm i

cd ..

# bash script setup
sudo apt install gnome-terminal
chmod +x ./bin/run_backend.sh
chmod +x ./bin/run_frontend.sh
chmod +x ./bin/run_all.sh
