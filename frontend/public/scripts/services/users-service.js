import { get, post, put, del } from "./api-service.js";

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

    return contentContainer.innerHTML = `
        <h1>Bienvenido compañero, que gusto verlo nuevamente!</h1>
    `
}

export function imDone(){
    localStorage.clear()
    const contentContainer = document.getElementById('content-container');  
    console.log("Adios!")
    return contentContainer.innerHTML = `
        <h1>Sesión cerrada con exito</h1>
    `
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