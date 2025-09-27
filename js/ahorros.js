import Usuario from "./registro.js";
class Ahorros extends Usuario{
    constructor(id, nombre, apellido, direccion, telefono, email, nroCuenta, tasaInteres, saldo,
        fechaApertura
    ){
        super(id, nombre, apellido, telefono, direccion, email)
        this.cuenta = nroCuenta
        this.saldo = saldo
        this.tasa = tasaInteres
        this.fecha = fechaApertura = new Date().toLocaleString()
    }

    realizarDepositoCtaAhorros(valorConsig){
        if (!isNaN(valorConsig)) {
    let saldo = parseFloat(localStorage.getItem("saldo")) || 0
    saldo += valorConsig;
    localStorage.setItem("saldo", saldo);
    alert(`Consignación exitosa. Nuevo saldo: ${saldo}`);
    } else {
    alert("Debe ingresar valores numericos")
    }

        }

    }

export default Ahorros