import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { uploadString, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import { MostrarMSG, LoadMSG, GestErr } from './MostrarMensaje.js'
import { storage, auth } from "./firebase.js"
import { listarData } from './LsTareas.js'
import { vrfUser } from './vrfSesion.js'


const FormReg = document.querySelector('#FormRegistro')
const inpFile = document.querySelector('#RegFoto')
const imgPerfil = document.querySelector('#RegImagePerfil')
const ModalReg = document.querySelector("#ModalReg")
const ModalIns = new bootstrap.Modal(ModalReg, {keyboard: false})


//----------------------RECURSOS NECESRIOS PARA LA IMAGEN----------------------//

function getBase64(file){
    return new Promise((resolve, reject)=>{
        const readImage = new FileReader()
        readImage.readAsDataURL(file)
        readImage.onload = ()=> resolve(readImage.result)
        readImage.onerror = (err)=> reject(err)
    })
}
const uuidv4 = ()=> ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

const showImage = async File => imgPerfil.setAttribute('src', File ? await getBase64(File) : 'assets/UserAnonimo.png')
inpFile.addEventListener('change', async (e)=>{
    showImage(e.target.files[0])
})

/*----------------------REGISTRO DE USUARIO----------------------*/

async function getUrlImage(Input){
    const StringImage = await getBase64(Input)    
    const NameImage = ref(storage, 'avatar/'+uuidv4())      
    await uploadString(NameImage, StringImage, 'data_url')
    const UrlImage = await getDownloadURL(NameImage)
    return UrlImage
}

FormReg.addEventListener('submit', async(e)=>{
    e.preventDefault()     
    //Datos del reg
    const DtaUser = {
        Nombre: FormReg['RegNombre'].value,
        Email: FormReg['RegEmail'].value,
        Password: FormReg['RegPassword'].value,
        Imagen: FormReg['RegFoto'].files[0]
    }    
    ModalIns.hide()    
    LoadMSG('Registrando usuario')    
    const UrlImage = await getUrlImage(DtaUser.Imagen)
    DtaUser.Imagen = UrlImage
    //Registrando...
    createUserWithEmailAndPassword(auth, DtaUser.Email, DtaUser.Password).then(async(dta) => {
        await updateProfile(dta.user.auth.currentUser, {
            displayName: DtaUser.Nombre,
            photoURL: DtaUser.Imagen
        })
        showImage()         
        vrfUser(dta.user)                   
        listarData(dta.user)                        
        MostrarMSG(`Hola, ${dta.user.email}`, 
        `Su cuenta fue creada y logeada en nuestra plataforma, 
        ahora puede hacer uso del registro de tareas.`)
    }).catch((err) => {
        //show errores
        console.log(err)
        GestErr(err)
    })                                         
})

//Restablece los valores al logear
ModalReg.addEventListener('hide.bs.modal', ()=>{
    setTimeout(() => {
        FormReg['RegNombre'].value = ''
        FormReg['RegEmail'].value = ''
        FormReg['RegPassword'].value = ''
        FormReg['RegFoto'].value = ''
        showImage()
    }, 500);
})