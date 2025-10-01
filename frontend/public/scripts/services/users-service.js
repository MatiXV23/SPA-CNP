import { get, postForLogin, post, put, del } from "./api-service.js";
import { bienvenidaFormTemplate } from "../templates/bienvenidaTemplate.js";
import { despedidaFormTemplate } from "../templates/despedidaTemplate.js";

const baseApiUrl = `http://localhost:3000`

export function isLogged() {
    return !!localStorage.getItem("AuthToken");
}

export async function haciendoLogin(){
    const contentContainer = document.getElementById('content-container');  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = await postForLogin(baseApiUrl + '/login', { username, password});
    localStorage.setItem("AuthToken", data.token);

    return contentContainer.innerHTML = bienvenidaFormTemplate;
}

export function imDone(){
    localStorage.clear()
    const contentContainer = document.getElementById('content-container');  
    console.log("Adios!")
    return contentContainer.innerHTML = despedidaFormTemplate;
}

export async function getUsers(){
    return await get(baseApiUrl + '/usuarios')
} 

export async function createUser(user){
    await post(baseApiUrl+'/usuarios', user)
}

export async function deleteUser(id_usuario){
    await del(baseApiUrl+`/usuarios/${id_usuario}`)
    return true
}

export async function putUser(id_usuario, userData) {
    await put(`${baseApiUrl}/usuarios/${id_usuario}`, userData)
}