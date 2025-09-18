import Usuario from "./registro.js";
class Corriente extends Usuario{
    constructor(id, nombre, apellido, direccion, telefono, email, nroCuenta, saldo, sobreGiro){
        super(id, nombre, apellido, telefono, direccion, email)
        this.cuenta = nroCuenta
        this.saldo = saldo
        this.sobreGiro = sobreGiro
    }
}
export default Corriente