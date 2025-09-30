import { getUsers, deleteUser } from "../services/users-service.js";
import { getUsersListTempalte } from "../templates/usersListTemplate.js";
import { editUserForm } from "./modificationForm.js";

export async function printUserList() {

    const contentContainer = document.getElementById('content-container');
    const users = await getUsers()

    const usersHtml = getUsersListTempalte(users)
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

}