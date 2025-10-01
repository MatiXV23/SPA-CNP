// MAIN JS 

import { printUserList } from "./components/userlist.js";
import { createUsersForm } from "./components/createUserForm.js";
import { haciendoLogin, imDone, isLogged } from "./services/users-service.js";
import { printNav } from "./components/navBar.js";
import { getLoginFormTemplate } from "./templates/loginFormTemplate.js";

const navCompletable = document.getElementById('barraNavegacion');

navCompletable.innerHTML = printNav()

const listBtn = document.getElementById('nav-list-btn');
const createBtn = document.getElementById('nav-create-btn');
const linBtn = document.getElementById('nav-login-btn');


listBtn.addEventListener('click', printUserList);
createBtn.addEventListener('click', createUsersForm);



if (!localStorage.getItem("AuthToken")) {
    linBtn.addEventListener('click', () => {
        getLoginFormTemplate();
        
        const setTokenLogin = document.getElementById("login-btn");
        
        setTokenLogin.addEventListener('click', async(e) => {
            e.preventDefault();
            await haciendoLogin();
        });
    });
    
}
else {
    const loutBtn = document.getElementById('nav-logout-btn');
    loutBtn.addEventListener('click', imDone);
}
