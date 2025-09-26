import { get, post, put, del } from "../services/api-service";

const baseApiUrl = `http://localhost:3000`

export async function getUsers(){
    await get(baseApiUrl + '/usuarios')
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