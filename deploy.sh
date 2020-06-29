# run chmod +x deploy.sh in case of an error when running this file
# cd root
# ./deploy.sh
export NODE_OPTIONS=--max_old_space_size=8192
sls deploy
