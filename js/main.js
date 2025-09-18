import Usuario from "./registro.js";

function registrar() {
    const usuario = new Usuario();
    usuario.captura();

    const confirmPass = document.getElementById("confirmPassword").value.trim();

    const guardarUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuario.password !== confirmPass) {
        alert("🚫 Las contraseñas no coinciden.");
        return;
    }

    const existe = guardarUsuarios.find(u => u.userName === usuario.userName);
    if (existe) {
        alert("🚫 Este usuario ya existe.");
        return;
    }


    guardarUsuarios.push({
        id: usuario.id,
        documento: usuario.documento,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        email: usuario.email,
        userName: usuario.userName,
        password: usuario.password,
        saldo: 0,
        movimientos: []
    });

    localStorage.setItem("usuarios", JSON.stringify(guardarUsuarios));
    alert("✅ Usuario registrado con éxito.");

    document.getElementById("registroForm").reset();
}

    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrarse").addEventListener("click", registrar);
});

let intentos = 3; // declara intentos fuera para que persista entre intentos

function loginUsuario() {
    const usuario = new Usuario();
    usuario.loginCaptura();

    const guardarUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const validarUsuario = guardarUsuarios.find(u =>
        u.userName === usuario.userName && u.password === usuario.password
    );

    if (validarUsuario) {
        alert("✅ Bienvenido al sistema");
        intentos = 3; // resetear intentos en éxito
    } else {
        intentos--;

        if (intentos > 0) {
            alert(`❌ Usuario o contraseña incorrectos. Quedan ${intentos} intentos.`);
        } else {
            alert("☠️ Cuenta bloqueada temporalmente.");
            // acá podrías bloquear el login o manejarlo como quieras
        }
    }
}

    document.addEventListener("DOMContentLoaded", () => {
        const botonIniciar = document.getElementById("iniciar");

        if (botonIniciar) {
            botonIniciar.addEventListener("click", loginUsuario);
    }
});




