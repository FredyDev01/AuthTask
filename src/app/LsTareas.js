import { getDocs, collection, query, orderBy, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
import { db } from './firebase.js'


const LstPublicaciones = document.querySelector('#showPublicaciones')


export const listarData = async(User)=>{
    //Efeto de carga 
    LstPublicaciones.innerHTML = `
    <li class="py-2 d-flex flex-column justify-content-center align-items-center">
        <span class="loader2"></span>
    </li>
    `
    //Busqueda de datos
    var AllData = []     
    if(User){
        const id = User.uid
        const consult = await getDocs(query(collection(db, 'Tareas'), orderBy('Importancia', 'desc'), orderBy('FechaPost', 'desc'), where('idUser', '==', id)))                
        AllData = consult.docs
    }    
    if(AllData.length){        
        var content = ''
        AllData.forEach(e=>{
            var Task = e.data() 
            content += `
            <li class="px-3 list-group-item list-group-item-action d-flex justify-content-start align-items-center cursor-pointer" data-idElement="${e.id}" role="button">                                
                <div class="w-1.5 h-1.5">
                    <span class="loader-check d-none" id="load-${e.id}"></span>
                    <input type="checkbox" class="m-0 form-check-input table d-block" id="task-${e.id}" ${Task.Estado ? 'checked' : ''} />                                    
                </div>
                <label class="mw-100 ms-3 me-4 form-check-label text-xs text-full" for="task-${e.id}">${Task.Tarea}</label>                                                    
                <p class="px-3 py-2 ms-auto ${Task.Importancia == 3 ? 'bg-danger': Task.Importancia == 2 ? 'bg-ImpMed' : 'bg-success'} rounded-5 text-light text-xxs" data-idElement="${e.id}">${Task.Importancia == 3 ? 'Alta' : Task.Importancia == 2 ? 'Media' : 'Baja'}</p>                                                
            </li>`            

        })
        LstPublicaciones.innerHTML = content
    }else{
        LstPublicaciones.innerHTML = `
        <li class="px-3 py-2 text-center" style="list-style: none;">                        
            <i class="mb-2 fas fa-thumbtack text-muted" style="font-size: 36px"></i><br>
            <span class="text-xs text-muted">
                El usuario no tiene publicaciones en nuestra base de datos.
            </span>
        </li>`
    }
}