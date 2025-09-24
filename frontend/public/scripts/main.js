// MAIN JS 

import { printNav } from "./components/navBar.js";
import { printUserList } from "./components/userlist.js";
import { createUsersForm } from "./components/createUserForm.js";

printNav()

const listBtn = document.getElementById('list-btn');
const createBtn = document.getElementById('create-btn');

listBtn.addEventListener('click', printUserList);
createBtn.addEventListener('click', createUsersForm);

