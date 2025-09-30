import { creationFormTemplate } from "../templates/creationFormTemplate.js";
import { createUser } from "../services/users-service.js";
import { printUserList } from "./userlist.js";


export async function createUsersForm(){
    const contentContainer = document.getElementById('content-container');    
    contentContainer.innerHTML = creationFormTemplate ;
    
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        contentContainer.innerHTML = printUserList();
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
    
    try {
    const creado = await createUser(userData);
    alert('¡Usuario creado con éxito!');
    document.getElementById('create-user-form').reset();
    } catch (err) {
        alert(`Error al crear usuario: ${err.message}`);
            const error = await response.json();
    }

    
    // if (creado) {
    //         alert('¡Usuario creado con éxito!');
    //         document.getElementById('create-user-form').reset();
    // } else {
    //     const error = await response.json();
    //     alert(`Error al crear usuario: ${error.message}`);
    // }
}