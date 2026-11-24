const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function asignarAdministrador() {
  const email = "TU_CORREO_ADMIN";

  const user = await admin.auth().getUserByEmail(email);

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });

  console.log("Administrador configurado correctamente.");
  console.log("UID:", user.uid);
  console.log("Correo:", user.email);
}

asignarAdministrador()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });