// MAIN JS 

import { printUserList } from "./components/userlist.js";
import { createUsersForm } from "./components/createUserForm.js";
import { haciendoLogin, imDone, isLogged } from "./services/users-service.js";
import { getNavTemplate } from "./templates/navBarTemplate.js";
import { printLoginForm } from "./components/loginForm.js";

const navCompletable = document.getElementById('barraNavegacion');

function cargarNav() { 
    navCompletable.innerHTML = getNavTemplate()

    const listBtn = document.getElementById('nav-list-btn');
    const createBtn = document.getElementById('nav-create-btn');
    const loutBtn = document.getElementById('nav-logout-btn');
    
    if (!localStorage.getItem("AuthToken")) {
        printLoginForm();
                
        const setTokenLogin = document.getElementById("login-btn");
        
        if(setTokenLogin){
            setTokenLogin.addEventListener('click', async(e) => {
                e.preventDefault();
                await haciendoLogin();
                cargarNav();
            });
        }
        if(loutBtn){
            loutBtn.style.display = 'none';
        }
    }
    else {
        listBtn.addEventListener('click', printUserList);
        createBtn.addEventListener('click', createUsersForm);

        if(loutBtn){
            loutBtn.style.display = 'block';
            loutBtn.addEventListener('click', () =>{
                imDone();
                cargarNav();
            });
        }
        if(linBtn){
            linBtn.style.display = 'none';
        }
    }
}

cargarNav();