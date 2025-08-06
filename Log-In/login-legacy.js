document.addEventListener("DOMContentLoaded", () => {
    // Configuración de Amplify
    Amplify.configure({
      Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_6V31Ne6Jf',
        userPoolWebClientId: 'br2vf2rggnj5vubb5u6hth0r3'
      }
    });
  
    // Manejador de envío del formulario
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
          const newPassword = prompt("Primera vez. Ingresa tu nueva contraseña:");
          try {
            const user = await Auth.signIn(username, password);
            await Auth.completeNewPassword(user, newPassword);
            alert("Contraseña actualizada. Redirigiendo...");
            window.location.href = "index.html";
          } catch (err) {
            alert("Error al cambiar contraseña: " + err.message);
          }
        } else {
          alert("Error: " + error.message);
        }
      }
    });
  });
  