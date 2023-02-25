import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { uploadString, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import { MostrarMSG, LoadMSG, GestErr } from './MostrarMensaje.js'
import { ValRegistro } from './Validations.js'
import { storage, auth } from "./firebase.js"
import { listarData } from './LsTareas.js'
import { vrfUser } from './vrfSesion.js'

const FormReg = document.querySelector('#FormRegistro') 
const InpFile = document.querySelector('#RegFoto')
const ImgPerfil = document.querySelector('#RegImagePerfil')
const ModalReg = document.querySelector("#ModalReg")
const ModalIns = new bootstrap.Modal(ModalReg, {keyboard: false})


/*---------------RECURSOS NECESRIOS PARA LA IMAGEN---------------*/

function GetBase64(file){
    return new Promise((resolve, reject)=>{
        const readImage = new FileReader()
        readImage.readAsDataURL(file)
        readImage.onload = ()=> resolve(readImage.result)
        readImage.onerror = (err)=> reject(err)
    })
}

const uuidv4 = ()=> ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
const ShowImage = async File => {
    ImgPerfil.setAttribute('src', File ? await GetBase64(File) : 'assets/UserAnonimo.png')
}

InpFile.addEventListener('change', async (e)=>{
    ShowImage(e.target.files[0])
})

/*---------------REGISTRO DE USUARIO---------------*/

async function GetUrlImage(Image){
    const StringImage = await GetBase64(Image)    
    const NameImage = ref(storage, 'avatar/'+uuidv4())      
    await uploadString(NameImage, StringImage, 'data_url')
    const UrlImage = await getDownloadURL(NameImage)
    return UrlImage
}

FormReg.addEventListener('submit', async(e)=>{
    e.preventDefault()     
    const Validacion = ValRegistro()
    if(Validacion){
        const ObjUser = {
            Nombre: FormReg['RegNombre'].value,
            Email: FormReg['RegEmail'].value,
            Password: FormReg['RegPassword'].value, 
            Imagen: FormReg['RegFoto'].files[0]
        }    
        ModalIns.hide()    
        LoadMSG('Registrando usuario')    
        const Avatar = await GetUrlImage(ObjUser.Imagen)
        createUserWithEmailAndPassword(auth, ObjUser.Email, ObjUser.Password).then(async(dta) => {
            await updateProfile(dta.user.auth.currentUser, {displayName: ObjUser.Nombre, photoURL: Avatar})
            ShowImage()         
            vrfUser(dta.user)                   
            listarData(dta.user)                        
            MostrarMSG(`Hola, ${dta.user.email}`, 'Su cuenta fue creada y logeada en nuestra plataforma, ahora puede hacer uso del registro de tareas.')
        }).catch((err) => {
            console.log(err)
            GestErr(err)
        })    
    }                                     
})

ModalReg.addEventListener('hide.bs.modal', ()=>{
    setTimeout(() => {
        FormReg['RegNombre'].value = ''
        FormReg['RegEmail'].value = ''
        FormReg['RegPassword'].value = ''
        FormReg['RegFoto'].value = ''
        Array.prototype.slice.call(FormReg.getElementsByTagName('INPUT')).forEach(e => {
            e.classList.remove('is-valid')
            e.classList.remove('is-invalid')
        })
    }, 500)
})