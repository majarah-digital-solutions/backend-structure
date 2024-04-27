const admin = require("firebase-admin");
const path = require('path');
const filePath = path.resolve(__dirname, '../files/firebaseAdminSdk/ma3ak-app-1cfa8-firebase-adminsdk-n122a-23d3274e40.json');
const serviceAccount = require(filePath);
global.firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});