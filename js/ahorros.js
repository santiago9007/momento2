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
}
export default Ahorros