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

chromium-browser --start-fullscreen http://localhost:5000
