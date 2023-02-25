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
    document.body.classList.remove('bodyBefore')    
    document.body.classList.add('bodyAfter')
    if(user){        
        NavSession.forEach(e => e.classList.add('d-none'))
        CloseSession.forEach(a => a.classList.remove('d-none'))                
        CtnSinSession.classList.add('d-none')
        CtnConSession.classList.remove('d-none')
        ImgUser.setAttribute('src', user.photoURL ? user.photoURL + '?timestamp=' + new Date().toLocaleTimeString() : './assets/UserAnonimo.png')
        NameUser.textContent = user.displayName ? user.displayName : 'Anonimo'
        EmailUser.textContent = user.email
        PhoneUser.textContent = user.phoneNumber ? user.phoneNumber : 'Desconocido'
    }else{
        CloseSession.forEach(a => a.classList.add('d-none'))
        NavSession.forEach(e => e.classList.remove('d-none'))        
        CtnConSession.classList.add('d-none')
        CtnSinSession.classList.remove('d-none')
    }
}