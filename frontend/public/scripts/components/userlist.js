import { getUsers, deleteUser } from "../api-connection/users_connection.js";
import { editUserForm } from "./modificationForm.js";

export async function printUserList() {

    const contentContainer = document.getElementById('content-container');
    const users = await getUsers()

    try {
        let usersHtml = `<h2 class="text-2xl font-semibold tracking-tight mb-10 text-balance text-white text-center">Listado de Usuarios</h2>`;
            
        if (!users || users.length === 0) {
            usersHtml += `<p>No hay usuarios registrados.</p>`;
        } else {
            usersHtml += `<ul class="flex max-w-4xl m-auto p-4 rounded-lg shadow bg-gray-800 sm:p-5 flex-col justify-between gap-x-6 py-5">`;
            users.forEach(user => {
                usersHtml += `
                    <li class="flex justify-left w-full text-center gap-x-6 py-5">
                        <div class="w-full text-left flex flex-col">
                            <h2 class="text-xl">${user.nombres}</h2>
                            <p class="text-md text-gray-400">${user.username} - ${user.email}</p>
                        </div>
                        <button class="edit-btn cursor-pointer w-1/6 ml-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-yellow-600 hover:bg-white/5" data-id="${user.id_usuario}">Editar</button>
                        <button class="delete-btn cursor-pointer w-1/6 ml-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-red-600 hover:bg-white/5" data-id="${user.id_usuario}">Eliminar</button>                        
                    </li>
                `;
            });
            usersHtml += `</ul>`;
        }
        
        contentContainer.innerHTML = usersHtml;

        const deleteButtons = document.querySelectorAll('.delete-btn');        
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const userId = button.dataset.id;
                
                const success = await deleteUser(userId);
                if (success) {
                    printUserList();
                } else {
                    alert('Error al eliminar usuario. Inténtalo de nuevo.');
                }
            });
        });
        const editButtons = document.querySelectorAll('.edit-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const userId = button.dataset.id;
                const users = await getUsers();
                const user = users.find(u => u.id_usuario == userId);
                editUserForm(user);
            });
        });

    } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        contentContainer.innerHTML = `<p>Error al cargar los usuarios: ${error.message}</p>`;
    }
}