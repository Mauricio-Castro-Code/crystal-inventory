import { Amplify, Auth } from 'https://cdn.jsdelivr.net/npm/aws-amplify/+esm';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_6V31Ne6Jf',
    userPoolWebClientId: 'gsbssrdptsccuk2tjkv96u02a'
  }
});

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const user = await Auth.signIn(username, password);
    alert("Sesión iniciada correctamente");
    window.location.href = "index.html";
  } catch (error) {
    if (error.code === 'NEW_PASSWORD_REQUIRED') {
      const newPassword = prompt("Esta es tu primera vez. Ingresa tu nueva contraseña:");
      try {
        const user = await Auth.signIn(username, password);
        await Auth.completeNewPassword(user, newPassword);
        alert("Contraseña cambiada exitosamente. Redirigiendo...");
        window.location.href = "index.html";
      } catch (err) {
        alert("Error al cambiar la contraseña: " + err.message);
      }
    } else {
      alert("Error: " + error.message);
    }
  }
});

