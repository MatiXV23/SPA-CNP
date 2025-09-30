// FUNCION PARA DEVOLVER EL HTML TEMPLATE DE LOS USUARIOS 

export function getUsersListTempalte(users) {
    let userListTemplate = `<h2 class="text-2xl font-semibold tracking-tight mb-10 text-balance text-white text-center">Listado de Usuarios</h2>`;
                
    if (!users || users.length === 0) {
        userListTemplate += `<p>No hay usuarios registrados.</p>`;
        return userListTemplate
    } 
    
    userListTemplate += `<ul class="flex max-w-4xl m-auto p-4 rounded-lg shadow bg-gray-800 sm:p-5 flex-col justify-between gap-x-6 py-5">`;
    users.forEach(user => {
        userListTemplate += `
            <li class="flex justify-left w-full text-center gap-x-6 py-5">
                <div class="ml-7 w-full text-left flex flex-col">
                    <h2 class="text-xl">${user.nombres}</h2>
                    <p class="text-md text-gray-400">${user.username} - ${user.email}</p>
                </div>
                <button class="edit-btn cursor-pointer w-1/5 ml-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-yellow-600 hover:bg-white/5" data-id="${user.id_usuario}">Editar</button>
                <button class="delete-btn cursor-pointer w-1/5 ml-3 mr-7 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-red-600 hover:bg-white/5" data-id="${user.id_usuario}">Eliminar</button>                        
            </li>
        `;
    });
    userListTemplate += `</ul>`
            
    return userListTemplate
}