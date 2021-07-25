
# Angular QR Code


## Start the Angular app
* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/custom_vids/tree/master/angular_qrxcode)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve 
```

## Misc
https://www.npmjs.com/package/angularx-qrcode v2 -v11
https://www.npmjs.com/package/ng-qrcode v12



## Required files
* open
AngularApp\src\app\app.component.ts
AngularApp\src\app\app.component.html


##  Messages
* QR is ususally recognized for authenticator however it can be used to contain simple message

__FILE app.component.ts__

* type in any string to the qrdata attribute
* then type in a website
* scan with your phone camera to see the value

## Authenticator

paste this code
```js
`otpauth://totp/${this.issuer}:${this.email}?secret=${this.qrCode}&issuer=${this.issuer}`
```
* email represents the users account or a username
* qrcode can be any message, what happens here is a time-based generation in combination with ther user account issuer and algrirthm to generate a 6 digit code
* issuer means your organization your web app, product identity
* however what really matters is the qr code which  needs to be encrpyted
* fill the values accordingly in the app.component.ts and the use an authenticator app for the result




## Resources
* [Read and write qr codes](https://goqr.me/api/doc/read-qr-code/)