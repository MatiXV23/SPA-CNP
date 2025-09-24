import { getUsers, deleteUser } from "../api-connection/users_connection.js";
import { editUserForm } from "./modificationForm.js";

export async function printUserList() {

    const contentContainer = document.getElementById('content-container');
    const users = await getUsers()

    try {
        let usersHtml = `<h2>Listado de Usuarios</h2>`;
            
        if (!users || users.length === 0) {
            usersHtml += `<p>No hay usuarios registrados.</p>`;
        } else {
            usersHtml += `<ul>`;
            users.forEach(user => {
                usersHtml += `
                    <li>
                        ${user.nombres} ${user.username} - ${user.email}
                        <button class="edit-btn" data-id="${user.id_usuario}">Editar</button>
                        <button class="delete-btn" data-id="${user.id_usuario}">Eliminar</button>                        
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
                editUserForm(user); // Abrir form de edición
            });
        });

    } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        contentContainer.innerHTML = `<p>Error al cargar los usuarios: ${error.message}</p>`;
    }
}