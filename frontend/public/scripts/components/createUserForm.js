import { creationFormTemplate } from "../templates/creationFormTemplate.js";
import { createUser } from "../api-connection/users_connection.js";


export async function createUsersForm(){
    const contentContainer = document.getElementById('content-container');    
    contentContainer.innerHTML = creationFormTemplate ;
    
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        contentContainer.innerHTML = `<p>Selecciona una opción del menú</p>`;
    });

    const form = document.getElementById('create-user-form');
    form.addEventListener('submit', async (event) => {
       event.preventDefault(); 
       postUser();
    });

}

async function postUser() {
    const nombres = document.getElementById('nombres').value;
    const is_admin= document.getElementById('is_admin').checked;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const userData = {
        nombres: nombres,
        is_admin: is_admin,
        username: username,
        email: email
    };
    
    const creado = await createUser(userData);
    
    if (creado) {
        alert('¡Usuario creado con éxito!');
        document.getElementById('create-user-form').reset();
    } else {
        const error = await response.json();
        alert(`Error al crear usuario: ${error.message}`);
    }
}