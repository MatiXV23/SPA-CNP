import { creationFormTemplate } from "../templates/creationFormTemplate.js";
import { putUser, createUser } from "../api-connection/users_connection.js";
import { printUserList } from "./userlist.js";

export function editUserForm(user) {
    const contentContainer = document.getElementById('content-container');    
    contentContainer.innerHTML = creationFormTemplate;

    document.getElementById('form-title').innerText = 'Editar usuario';
    document.getElementById('submit-btn').innerText = 'Actualizar';

    document.getElementById('nombres').value = user.nombres;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('is_admin').checked = user.is_admin;

    const form = document.getElementById('create-user-form');

    form.onsubmit = async (event) => {
        event.preventDefault();
        await submitUserForm(user.id_usuario);
        printUserList();
    };
}


export async function submitUserForm(id_usuario = null) {
    const nombres = document.getElementById('nombres').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const is_admin = document.getElementById('is_admin').checked;

    const userData = { nombres, username, email, is_admin };

    try {
        if (id_usuario) {
            await putUser(id_usuario, userData);
            alert('¡Usuario actualizado con éxito!');
        } else {
            await createUser(userData);
            alert('¡Usuario creado con éxito!');
        }
        document.getElementById('create-user-form').reset();
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
}