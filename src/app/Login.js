import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { MostrarMSG, LoadMSG, GestErr } from './MostrarMensaje.js'
import { auth } from './firebase.js'


const formLogin = document.querySelector('#FormLogin')
const btnLogGoogle = document.querySelector("#logGoogle")
const btnLogFacebook = document.querySelector("#logFacebook")
const btnLogGitHub = document.querySelector("#logGitHub")
const Modal = document.querySelector("#ModalLog")
const InstModal = new bootstrap.Modal(Modal, {keyboard: false})


/*--------------------------LOGIN NORMAL O BASE--------------------------*/

formLogin.addEventListener('submit', (e)=>{
    e.preventDefault() 
    //Datos del user
    const UserLog = {
        Email: formLogin['LogEmail'].value,
        Password: formLogin['LogPassword'].value
    }       
    InstModal.hide()
    LoadMSG('Logeando usuario')    
    //Logeando usuario
    signInWithEmailAndPassword(auth, UserLog.Email, UserLog.Password).then((dta)=>{                 
        MostrarMSG(`Hola, ${dta.user.email}`, 
        `Su cuenta fue logeada con exito dentro de la 
        plataforma, ahora puede hacer uso de la aplicacion web.`)
    }).catch((err) => {        
        console.log(err)
        GestErr(err)    
    })
})

//Restablece los valores al logear
ModalLog.addEventListener('hide.bs.modal', ()=>{
    setTimeout(()=>{
        formLogin['LogEmail'].value = ''
        formLogin['LogPassword'].value = ''
    }, 500)    
})

/*--------------------------lOGIN CON PLATAFORMAS--------------------------*/

btnLogGoogle.addEventListener('click', async()=>{          
    try{
        const Provider = new GoogleAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)                
        InstModal.hide()     
        MostrarMSG(`Hola, ${Credentials.user.email}`, 
        `Hemos podido validar su cuenta de google y pudimos 
        logear su usuario dentro de nuestra aplicacion.`)
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})

btnLogFacebook.addEventListener('click', async()=>{    
    try{
        const Provider = new FacebookAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)
        InstModal.hide()
        MostrarMSG(`Hola, ${Credentials.user.email}`,
        `Hemos podido validar su cuenta de facebook y pudimos 
        logear su usuario dentro de nuestra aplicacion.`)
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})

btnLogGitHub.addEventListener('click', async()=>{  
    try{
        const Provider = new GithubAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)
        InstModal.hide()
        MostrarMSG(`Hola, ${Credentials.user.email}`,
        `Hemos podido validar su cuenta de github y pudimos 
        logear su usuario dentro de nuestra aplicacion.`)        
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})