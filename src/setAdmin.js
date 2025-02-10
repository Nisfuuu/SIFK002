// setAdmin.js
const admin = require("firebase-admin");

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Atau gunakan credential lain sesuai kebutuhan
});

// Ganti dengan email admin yang diinginkan
const email = "admin@gmail.com";

admin
  .auth()
  .getUserByEmail(email)
  .then((userRecord) => {
    // Menetapkan custom claims
    return admin.auth().setCustomUserClaims(userRecord.uid, { role: "admin" });
  })
  .then(() => {
    console.log("Custom claims set for admin user");
  })
  .catch((error) => {
    console.log("Error setting custom claims:", error);
  });
