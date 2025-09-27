 class Usuario{
    constructor(id, nombres, apellidos, telefono, direccion, email, userName, password){
        this.id = id
        this.nombres = nombres
        this.apellidos = apellidos
        this.direccion = direccion
        this.telefono = telefono
        this.email = email
        this.userName = userName
        this.password = password
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
    }

    loginCaptura() {
        this.userName = document.getElementById("user").value
        this.password = document.getElementById("password").value
    }

}
 export default Usuario

 