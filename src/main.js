import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { auth } from './app/firebase.js'
import { vrfUser } from './app/vrfSesion.js'
import { listarData } from './app/LsTareas.js'
import './app/Registro.js'
import './app/Login.js'
import './app/GestAcciones.js'
import './app/CerrarSesion.js'


onAuthStateChanged(auth, user => {    
    if(user){    
        if(user.providerData[0].providerId != 'password' || user.displayName && user.photoURL){
            vrfUser(user)
            listarData(user)                
        }        
    }else{
        listarData(null)    
        vrfUser(null)        
    }
})