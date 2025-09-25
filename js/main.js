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
    cuenta: nuevaCuenta.cuenta,
    saldo: nuevaCuenta.saldo,
    tasa: nuevaCuenta.tasa,
    fecha: nuevaCuenta.fecha,
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
  const validarUsuario = guardarUsuarios.find(
    u => u.userName === usuario.userName && u.password === usuario.password
  );

  if (validarUsuario) {
    alert(`✅ Bienvenido ${validarUsuario.nombre}`);

    // 🔹 Guardar usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(validarUsuario));

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

  
  if (document.getElementById("dashboard")) {
    showDashboardInfo();
  }
});

// 🔹 Función para mostrar la info en el dashboard
function showDashboardInfo() {
  const infoCuentaEl = document.getElementById("infoCuenta");
  const infoSaldoEl = document.getElementById("infoSaldo");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));


  if (infoCuentaEl) infoCuentaEl.textContent = `Cuenta: ${usuarioActivo.cuenta}`;
  if (infoSaldoEl) infoSaldoEl.textContent = `Saldo disponible: $${usuarioActivo.saldo.toFixed(2)}`;
}

function transferir(){

    const cuentaOrigen = document.getElementById("cuentaOrigen").value.trim()
    const cuentaDestino = document.getElementById("cuentaDestino").value.trim()
    const monto = parseFloat(document.getElementById("monto").value)

    //Validaciones

    if(!cuentaOrigen || !cuentaDestino || !isFinite(monto) || monto <= 0){
        alert("⚠️ Completa todos los campos con datos validos")
        return
    }

    if(cuentaOrigen === cuentaDestino){
        alert("🚫 No puedes transferirte a la misma cuenta")
        return
    }

    //Obtener usuarios

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const origen = usuarios.find(u => u.cuenta === cuentaOrigen)
    const destino = usuarios.find(u => u.cuenta === cuentaDestino)

    if(!origen){
        alert("🚫 La cuenta de origen no existe")
        return
    }

    if(!destino){
        alert("🚫 La cuenta destino no existe")
        return
    }

    if(origen.saldo < monto){
        alert("💸 Saldo insuficiente en la cuenta de origen")
        return
    }

    //Actualizar datods

    origen.saldo -= monto
    destino.saldo += monto

    //Registrar movimientos

    const fecha = new Date().toLocaleString()
    origen.movimientos.push({
        tipo: "Transferencia enviada",
        monto: -monto,
        destino: destino.cuenta,
        fecha
    })

    destino.movimientos.push({
        tipo: "Transferencia recibida",
        monto: +monto,
        origen: origen.cuenta,
        fecha
    })

    //Guardar en el localStorage

    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    alert(`✅ Transferencia realizada con exito.
        Origen: ${origen.cuenta}
        Destino: ${destino.cuenta}
        Monto: $${monto}`)

        //Resetear el formulario

        document.querySelector("form").reset()
}

//Activar listener solo en transferir.html

document.addEventListener("DOMContentLoaded", () => {
    const btnTransferir = document.getElementById("btnTransferir")

    if(btnTransferir){
        btnTransferir.addEventListener("click", transferir)
    }
})

//Función consultar saldo

/*function consultarSaldo(e) {
  e.preventDefault();

  // Obtener al usuario logueado
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    alert("🚫 No hay ninguna sesión activa");
    return;
  }

  // Mostrar el saldo
  const resultadoSaldo = document.getElementById("resultadoSaldo");
  resultadoSaldo.textContent = `💰 Saldo disponible: $${Number(usuarioActivo.saldo).toFixed(2)}`;
}

// Activar el evento
document.addEventListener("DOMContentLoaded", () => {
  const btnConsultar = document.getElementById("btnConsultarSaldo");
  if (btnConsultar) {
    btnConsultar.addEventListener("click", consultarSaldo);
  }
}); */




