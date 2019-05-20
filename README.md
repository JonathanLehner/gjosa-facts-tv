# gjosa-facts-tv
gjosa-facts-tv counter for raspberry pi

reset: 
press 'd' on keyboard while the page is open

deployment to Zeit:
npm run build
cd build
now --name gjosa-facts-tv

npm install -g serve
serve -s build

On raspberry pi:
To change the resolution, run the command sudo raspi-config , navigate to Advanced Options > Resolution, and choose an option.

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

https://www.raspberrypi.org/forums/viewtopic.php?t=47152 
--> put negative overscan depending on the monitor
https://blog.gordonturner.com/2017/12/10/raspberry-pi-full-screen-browser-raspbian-december-2017/
https://raspberrypi.stackexchange.com/questions/8734/execute-script-on-start-up

# gives a 404 error: @serve -s pathtoproject/build -l 5555
# open browser empty because npm start is slow and will open a new tab once it is ready
@chromium-browser --start-fullscreen --app=https://localhost:5555
@npm start --prefix pathtoproject
# --app= starts in app mode without most browser controls
# compilation can be quite slow
