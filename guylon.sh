

export LD_LIBRARY_PATH="$(pwd)/mjpg-streamer-experimental"

./mjpg-streamer-experimental/mjpg_streamer -i "./input_uvc.so" -o "./output_http.so -w ./www" &

node guylon.js