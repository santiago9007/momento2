 class Usuario{
    constructor(id, nombre, apellido, telefono, direccion, email, userName, password, tipoCuenta, nroCuenta, saldo = 0){
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.direccion = direccion
        this.telefono = telefono
        this.email = email
        this.userName = userName
        this.password = password
        this.tipoCuenta = tipoCuenta
        this.nroCuenta = nroCuenta
        this.saldo = saldo
    }
    captura(){
      
        this.id = document.getElementById("id").value
        this.nombre = document.getElementById("nombre").value
        this.apellido = document.getElementById("apellido").value
        this.telefono = document.getElementById("telefono").value
        this.direccion = document.getElementById("direccion").value;
        this.email = document.getElementById("email").value;
        this.userName = document.getElementById("user").value;
        this.password = document.getElementById("password").value;
        this.tipoCuenta = document.querySelector('input[name="tipoCuenta"]:checked')?.value || ""

    }

    loginCaptura() {
        this.userName = document.getElementById("user").value
        this.password = document.getElementById("password").value
    }

}
 export default Usuario

 cualquierCosa="nada"