/*---------------MENSAJES GENERALES---------------*/

export function MostrarMSG(tlt, msg, err = false){
  Swal.fire({
    icon: err ? 'error': 'success',
    title: tlt,
    html: `<p class="text-xs">${msg}</p>`    
  })
}

export function LoadMSG(tlt){
  Swal.fire({    
    title: tlt,
    html: `
    <div class="py-4 d-flex justify-content-center align-items-center" style="height: 40px">
      <span class="loader-modal"></span>
    </div>
    <p class="text-xs mt-4">
      Nos encontramos en el proceso de realizar la accion solicitada,
      esto puede tomar algunos segundos.
    </p>
    `,
    confirmButtonText: 'Esperar'
  })
}

/*---------------MENSAJES DE ERROR---------------*/

export function GestErr(err){
  if(err.code == 'auth/user-not-found'){
      MostrarMSG('El correo no existe', 'Al parecer el correo utilizado dentro del login no coincide con ninguno dentro de la base de datos.', true)
  }else if(err.code == 'auth/wrong-password'){
      MostrarMSG('La constraseña es incorrecta', 'Al parecer la contraseña utilizada no coincide con el correo que ingreso, le recomendamos volver a intentarlo.', true)
  }else if(err.code == 'auth/account-exists-with-different-credential'){
      MostrarMSG('Cuenta existente con otra red social', 'La red social con la que se intenta logear tiene un correo que ya existe en nuestra plataforma, le recomendamos utilizar otra.', true)
  }else if(err.code == 'auth/email-already-in-use'){
      MostrarMSG('Correo existente', 'Al parecer alguien mas ya se registro con ese correo, le recomendamos utilizar otro.', true)
  }else if(err.code == 'auth/invalid-email'){
      MostrarMSG('Correo invalido', 'El formate del que tiene el correo es incorrecto, recuerde que este debe tener un "@" y un ".".', true)
  }else if (err.code == 'uth/weak-password'){ 
      MostrarMSG('Contraseña debil', 
      'La contraseña debe tener almenos 6 caracteres, esto es para mantener mas segura su cuenta.', true)
  }else if(err.code != 'auth/popup-closed-by-user'){ 
      MostrarMSG('Al parecer algo salio mal', 'Lamentablemente algo inesperado provoco que el proceso realizado no se llevara a cabo, le recomendamos volver a intentarlo mas tarde.', true)
  }
}