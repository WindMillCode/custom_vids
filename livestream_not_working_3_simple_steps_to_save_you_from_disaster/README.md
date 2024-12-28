
# Livestream not working 3 simple steps to save you from disaster

Right Click in your web browser -> Click Inspect -> Click Console in the open Dev Tools > use ```clear()``` in the console input and hit enter to clear the logging infi

View all cameras
```
navigator.mediaDevices.enumerateDevices().then(devices => {
  devices.forEach(device => {
    if (device.kind === 'videoinput') {
      console.log(`Camera: ${device.label} - ID: ${device.deviceId}`);
    }
  });
});
```

Stop a camera
```js
let currentStream;

// Stop all cameras except the OBS Virtual Camera
function stopOtherCameras(targetLabel) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        if (device.kind === 'videoinput' && !device.label.includes(targetLabel)) {
          // Stop the stream of the non-target camera
          navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: device.deviceId } } })
            .then(stream => {
              stream.getTracks().forEach(track => track.stop());
              console.log(`Stopped camera: ${device.label}`);
            })
            .catch(error => {
              console.error(`Error stopping camera ${device.label}:`, error);
            });
        }
      });
    })
    .catch(error => {
      console.error('Error enumerating devices:', error);
    });
}


// Execute the process
stopOtherCameras('OBS Virtual Camera');


```

Start the desired camera
```ts
// Start the OBS Virtual Camera
function startCamera(targetLabel) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const targetDevice = devices.find(device => device.kind === 'videoinput' && device.label.includes(targetLabel));
      if (targetDevice) {
        navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: targetDevice.deviceId } } })
          .then(stream => {
            const videoElement = document.querySelector('video'); // Replace with your video element selector
            videoElement.srcObject = stream; // Attach the new stream to the video element
            currentStream = stream; // Store the new stream globally
            console.log(`Started camera: ${targetLabel}`);
          })
          .catch(error => {
            console.error(`Error starting camera ${targetLabel}:`, error);
          });
      } else {
        console.error(`Camera ${targetLabel} not found`);
      }
    })
    .catch(error => {
      console.error('Error enumerating devices:', error);
    });
}
startCamera('OBS Virtual Camera');
```





