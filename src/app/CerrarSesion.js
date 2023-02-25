import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { auth } from './firebase.js'

const clsSessionNav = document.querySelector('#CerrarSession')


clsSessionNav.addEventListener('click', async()=>{
    await signOut(auth)
})