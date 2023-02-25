const InpsReg = document.querySelectorAll('#FormRegistro input')
const InpsLog = document.querySelectorAll('#FormLogin input')
const InpsTask = document.querySelectorAll('#FormNewTarea select, textarea')


/*---------------FUNCIONES DE VALIDACION---------------*/

export function ValRegistro(){
    const EstadoReg = []   
    InpsReg.forEach(e => {
        var Estado = true
        if(e.id == 'RegFoto' || e.id == 'RegNombre'){
            if(e.value.length == 0) Estado = false
        }
        else if(e.id == 'RegEmail'){
            if(!e.value.length > 10 || !e.value.includes('@') || !e.value.includes('.com')) Estado = false
        }
        else if(e.id == 'RegPassword'){
            if(e.value.length < 8) Estado = false
        }
        else if(e.id == 'RepPassword'){
            if(e.value.length < 8 || e.value != FormReg['RegPassword'].value) Estado = false
        }                
        EstadoReg.push({'id': e.id, Estado})
    })    
    const CorrectReg = EstadoReg.every(i => i.Estado)
    if(!CorrectReg) SetEstilos(EstadoReg)
    return CorrectReg    
}

export function ValLogin(){
    const EstadoLog = []
    InpsLog.forEach(e => {
        var Estado = true
        if(e.id == 'LogEmail'){
            if(!e.value.length > 10 || !e.value.includes('@') || !e.value.includes('.com')) Estado = false
        }else if(e.id == 'LogPassword'){
            if(e.value.length < 8) Estado = false
        }
        EstadoLog.push({'id': e.id, Estado})
    })
    const CorrectLog = EstadoLog.every(i => i.Estado)
    if(!CorrectLog) SetEstilos(EstadoLog)
    return CorrectLog
}

export function ValTask(){
    const EstadoTask = []
    InpsTask.forEach(e => {
        EstadoTask.push({'id': e.id, 'Estado': !e.value.length ? false : true})
    })
    const CorrectTask = EstadoTask.every(i => i.Estado)
    if(!CorrectTask) SetEstilos(EstadoTask)
    return CorrectTask
}

/*---------------ASIGNACION DE CLASES---------------*/

function SetEstilos(Array){
    Array.forEach(e => {
        document.getElementById(e.id).classList.remove('is-invalid')
        document.getElementById(e.id).classList.remove('is-valid')
        document.getElementById(e.id).classList.add(e.Estado ? 'is-valid' : 'is-invalid')
    })
}