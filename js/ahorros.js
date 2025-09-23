import Usuario from "./registro.js";

class Ahorros extends Usuario {
    constructor(id, nombres, apellidos, telefono, direccion, email, userName, password, tasaInteres) {
        super(id, nombres, apellidos, telefono, direccion, email, userName, password);
        
        this.cuenta = this.generarNroCuenta("A"); // Genera nro de cuenta de ahorros
        this.saldo = 0; // saldo inicial en 0
        this.tasa = tasaInteres;
        this.fecha = new Date().toLocaleString();
    }

    generarNroCuenta(tipo) {
        const numero = String(Math.floor(Math.random() * 1_000_000_000)).padStart(9, "0");
        return `${tipo}-${numero.slice(0,3)}-${numero.slice(3,6)}-${numero.slice(6)}`;
    }
}

export default Ahorros;
