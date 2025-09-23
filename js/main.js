import Usuario from "./registro.js";
import Ahorros from "./ahorros.js";

function registrar() {
    const usuario = new Usuario();
    usuario.captura();

    const confirmPass = document.getElementById("confirmPassword").value.trim();
    const guardarUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validar campos obligatorios
    if (
        !usuario.id ||
        !usuario.nombre ||
        !usuario.apellido ||
        !usuario.telefono ||
        !usuario.direccion ||
        !usuario.email ||
        !usuario.userName ||
        !usuario.password ||
        !confirmPass
    ) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
    }

    if (usuario.password !== confirmPass) {
        alert("🚫 Las contraseñas no coinciden.");
        return;
    }

    const existe = guardarUsuarios.find(u => u.userName === usuario.userName);
    if (existe) {
        alert("🚫 Este usuario ya existe.");
        return;
    }

    // Crear cuenta de ahorros asociada al usuario
    const nuevaCuenta = new Ahorros(
        usuario.id,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.direccion,
        usuario.email
    );

    guardarUsuarios.push({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        email: usuario.email,
        userName: usuario.userName,
        password: usuario.password,
        cuenta: nuevaCuenta.cuenta,   // Número de cuenta generado
        saldo: nuevaCuenta.saldo,     // Saldo inicial
        tasa: nuevaCuenta.tasa,       // Tasa de interés
        fecha: nuevaCuenta.fecha,     // Fecha de apertura
        movimientos: []
    });

    localStorage.setItem("usuarios", JSON.stringify(guardarUsuarios));
    alert(`✅ Usuario registrado con éxito. 
Cuenta creada: ${nuevaCuenta.cuenta}`);

    window.location.href = "index.html";
}

// Registro
document.addEventListener("DOMContentLoaded", () => {
    const btnRegistrar = document.getElementById("registrarse");
    if (btnRegistrar) btnRegistrar.addEventListener("click", registrar);
});

// Login
let intentos = 3;

function loginUsuario() {
    const usuario = new Usuario();
    usuario.loginCaptura();

    const guardarUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const validarUsuario = guardarUsuarios.find(u =>
        u.userName === usuario.userName && u.password === usuario.password
    );

    if (validarUsuario) {
        alert(`✅ Bienvenido ${validarUsuario.nombre}`);
        window.location.href = "dashboard.html";
        intentos = 3;
    } else {
        intentos--;
        if (intentos > 0) {
            alert(`❌ Usuario o contraseña incorrectos. Quedan ${intentos} intentos.`);
        } else {
            alert("☠️ Cuenta bloqueada temporalmente.");
        }
    }
}

// Login listener
document.addEventListener("DOMContentLoaded", () => {
    const botonIniciar = document.getElementById("iniciar");
    if (botonIniciar) botonIniciar.addEventListener("click", loginUsuario);
});





