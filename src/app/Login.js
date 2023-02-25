import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { MostrarMSG, LoadMSG, GestErr } from './MostrarMensaje.js'
import { ValLogin } from './Validations.js'
import { auth } from './firebase.js'

const FormLogin = document.querySelector('#FormLogin')
const BtnLogGoogle = document.querySelector("#logGoogle")
const BtnLogFacebook = document.querySelector("#logFacebook")
const BtnLogGitHub = document.querySelector("#logGitHub")
const Modal = document.querySelector("#ModalLog")
const InstModal = new bootstrap.Modal(Modal, {keyboard: false})


/*---------------LOGIN NORMAL O BASE---------------*/

FormLogin.addEventListener('submit', (e)=>{
    e.preventDefault() 
    const Validacion = ValLogin()
    if(Validacion){
        const UserLog = {
            Email: FormLogin['LogEmail'].value,
            Password: FormLogin['LogPassword'].value
        }       
        InstModal.hide()
        LoadMSG('Logeando usuario')    
        signInWithEmailAndPassword(auth, UserLog.Email, UserLog.Password).then((dta)=>{                 
            MostrarMSG(`Hola, ${dta.user.email}`, 
            `Su cuenta fue logeada con exito dentro de la 
            plataforma, ahora puede hacer uso de la aplicacion web.`)
        }).catch((err) => {        
            console.log(err)
            GestErr(err)    
        })
    }
})

ModalLog.addEventListener('hide.bs.modal', ()=>{
    setTimeout(()=>{
        FormLogin['LogEmail'].value = ''
        FormLogin['LogPassword'].value = ''
        Array.prototype.slice.call(FormLogin.getElementsByTagName('INPUT')).forEach(e => {
            e.classList.remove('is-valid')
            e.classList.remove('is-invalid')            
        })
    }, 500)    
})

/*---------------lOGIN CON PLATAFORMAS---------------*/

BtnLogGoogle.addEventListener('click', async()=>{          
    try{
        const Provider = new GoogleAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)                
        InstModal.hide()     
        MostrarMSG(`Hola, ${Credentials.user.email}`, 'Hemos podido validar su cuenta de google y pudimos logear su usuario dentro de nuestra aplicacion.')
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})

BtnLogFacebook.addEventListener('click', async()=>{    
    try{
        const Provider = new FacebookAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)
        InstModal.hide()
        MostrarMSG(`Hola, ${Credentials.user.email}`, 'Hemos podido validar su cuenta de facebook y pudimos logear su usuario dentro de nuestra aplicacion.')
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})

BtnLogGitHub.addEventListener('click', async()=>{  
    try{
        const Provider = new GithubAuthProvider()
        const Credentials = await signInWithPopup(auth, Provider)
        InstModal.hide()
        MostrarMSG(`Hola, ${Credentials.user.email}`, 'Hemos podido validar su cuenta de github y pudimos logear su usuario dentro de nuestra aplicacion.')        
    }catch(err){
        console.log(err)
        GestErr(err)
    }
})