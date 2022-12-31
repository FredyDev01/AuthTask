const NavSession = document.querySelectorAll('.log-Dsc')
const CloseSession = document.querySelectorAll('.log-Act')
const CtnSinSession = document.querySelector('#CtnSinSession')
const CtnConSession = document.querySelector('#CtnConSession')
const ImgUser = document.querySelector('#ImageUser')
const NameUser = document.querySelector('#nameUser')
const EmailUser = document.querySelector('#emailUser')
const PhoneUser = document.querySelector('#phoneUser')


export const vrfUser = user =>{
    document.getElementById("Loader").classList.add('d-none')
    document.body.classList.remove('overflow-hidden')
    if(user){        
        //Ocultar secciones
        NavSession.forEach(e => e.style.display = 'none')
        CloseSession.forEach(a => a.style.display = 'block')        
        CtnSinSession.style.display = 'none'
        CtnConSession.style.display = 'block'        
        //Rellenar data
        ImgUser.setAttribute('src', user.photoURL ? user.photoURL: './assets/UserAnonimo.png')
        NameUser.textContent = user.displayName ? user.displayName : 'Anonimo'
        EmailUser.textContent = user.email
        PhoneUser.textContent = user.phoneNumber ? user.phoneNumber : 'Desconocido'             
    }else{
        CloseSession.forEach(a => a.style.display = 'none')
        NavSession.forEach(e => e.style.display = 'block')
        CtnConSession.style.display = 'none'
        CtnSinSession.style.display = 'block'                
    }
}