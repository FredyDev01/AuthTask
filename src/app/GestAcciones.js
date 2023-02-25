import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, setDoc, query, where, documentId } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
import { MostrarMSG, LoadMSG, GestErr } from './MostrarMensaje.js'
import { listarData } from '../app/LsTareas.js'
import { db, auth } from './firebase.js'
import { ValTask } from './Validations.js'

const Modal = document.querySelector('#ModalNewPost')
const InsModal = new bootstrap.Modal(Modal, {keyboard: false})
const FormTask = document.querySelector('#FormNewTarea')
const CtnTask = document.querySelector('#showPublicaciones')
const tltTarea = document.querySelector('#tltTarea')
const btnEnvTarea = document.querySelector('#btnEnvTarea')


/*---------------AÑADIR TAREAS---------------*/

FormTask.addEventListener('submit', async(e)=>{
    e.preventDefault()    
    const Validacion = ValTask()
    if(Validacion){
        const Tarea = FormTask['txtTarea'].value
        const Importancia = FormTask['txtImportancia'].value
        const EstForm = e.target.dataset.estado     
        if(EstForm == 0){
            const NewData = {
                'Tarea': Tarea,
                'Importancia': parseInt(Importancia), 
                'Estado': false,
                'idUser': auth.currentUser.uid,
                'FechaPost': new Date()
            }
            InsModal.hide()
            LoadMSG('Insertando tarea')
            try{
                await addDoc(collection(db, 'Tareas'), NewData)                                        
                MostrarMSG('Registro exitoso', 'La tarea que ingreso se registro con exito en nuestra base de datos.')            
                listarData(auth.currentUser)
            }catch(err){            
                console.log(err)
                GestErr(err)
            }
        }else{
            const UpdateData = {
                'Tarea': Tarea,
                'Importancia': parseInt(Importancia),            
            }
            InsModal.hide()
            LoadMSG('Actualizando tarea')                
            getDoc(doc(db, 'Tareas', EstForm)).then(async(e)=>{
                if(e.data().idUser == auth.currentUser.uid){
                    await setDoc(doc(db, 'Tareas', EstForm), UpdateData, { merge: true })
                    MostrarMSG('Actualizacion exitosa', 'El proceso de actualizacion de la tarea se realizo con exito, ahora podra visualizar dicha tarea.')                        
                    listarData(auth.currentUser)                
                }else throw 'La tarea no le pertenece!'                
            }).catch((err) => {
                console.log(err) 
                GestErr(err)               
            })                                            
        }        
    }
})

Modal.addEventListener('hide.bs.modal', ()=>{
    setTimeout(()=>{
        tltTarea.textContent = 'Agregar tarea:'
        btnEnvTarea.textContent = 'Agregar' 
        FormTask['txtTarea'].value = ''
        FormTask['txtImportancia'].value = ''    
        FormTask.setAttribute('data-Estado', 0)
        Array.prototype.slice.call(FormTask.getElementsByTagName('INPUT')).forEach(e => {
            e.classList.remove('is-valid')
            e.classList.remove('is-invalid')   
        })
    }, 500)
})

/*---------------ACTIONES CON LAS TAREAS---------------*/

async function EditTask(id){
    try{
        LoadMSG('Obteniendo tarea')
        var DataTask = await getDocs(query(collection(db, 'Tareas'), where(documentId(), '==', id), where('idUser', '==', auth.currentUser.uid)))
        FormTask['txtTarea'].value = DataTask.docs[0].data().Tarea 
        FormTask['txtImportancia'].value = DataTask.docs[0].data().Importancia 
        tltTarea.textContent = 'Editar tarea:'
        btnEnvTarea.textContent = 'Editar'
        FormTask.setAttribute('data-indEstado', DataTask.docs[0].id)
        Swal.close()
        InsModal.show()    
    }catch(err){
        console.log(err)
        GestErr(err)               
    }
}

function DeleteTask(id){
    Swal.fire({
        icon: 'question',
        title: '¿Estas realmente seguro?',
        html: '<p class="text-xs">En caso aceptes la alerta, se eliminara de manera permanente la tarea seleccionada.</p>',        
        showCancelButton: true,
        confirmButtonText: 'Estoy seguro',
        cancelButtonText:'Cancelar'
    }).then((rsp)=>{
        if(rsp.isConfirmed){
            LoadMSG('Eliminando tarea')
            getDoc(doc(db, 'Tareas', id)).then(async(e)=>{
                if(e.data().idUser == auth.currentUser.uid){
                    await deleteDoc(doc(db, 'Tareas', id))
                    MostrarMSG('Eliminacion exitosa', 'El proceso de eliminacion se realizo con exito y la tarea dejo de existir.')                        
                    listarData(auth.currentUser)
                }else throw 'La tarea no le pertenece!'                
            }).catch((err)=>{
                console.log(err)                
                GestErr(err)               
            })
        }
    })
}

CtnTask.addEventListener('change', async(e)=>{
    var idElement = e.target.id.toString().split('-')[1]    
    var state = e.target.checked       
    document.querySelector('#load-'+idElement).classList.toggle('d-none')
    document.querySelector('#task-'+idElement).classList.toggle('d-none')
    try{
        await setDoc(doc(db, 'Tareas', idElement), {Estado: state}, { merge: true })
    }catch(err){
        console.log(err)
    }
    document.querySelector('#load-'+idElement).classList.toggle('d-none')
    document.querySelector('#task-'+idElement).classList.toggle('d-none')
})

CtnTask.addEventListener('click', (e)=>{    
    if(e.target.tagName == 'LI' || e.target.tagName == 'P'){
        const idTask = e.target.dataset.idelement
        Swal.fire({
            icon: 'question',
            title: '¿Que desea hacer?',
            html: '<p class="text-xs">Escoga entre las opciones proporcionadas para poder gestionar la tarea seleccionada, recuerde a su vez que estas acciones no son reversibles.</p>',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((rst)=>{
            if(rst.isConfirmed){
                EditTask(idTask)
            }else if(rst.isDenied){
                DeleteTask(idTask)
            }
        })
    }
})