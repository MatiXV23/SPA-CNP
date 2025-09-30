import { creationFormTemplate } from "../templates/creationFormTemplate.js";
import { createUser } from "../services/users-service.js";
import { printUserList } from "./userlist.js";


export async function createUsersForm(){
    const contentContainer = document.getElementById('content-container');    
    contentContainer.innerHTML = creationFormTemplate ;
    
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', () => {
        printUserList();
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
    
    await createUser(userData);
    await printUserList();
}