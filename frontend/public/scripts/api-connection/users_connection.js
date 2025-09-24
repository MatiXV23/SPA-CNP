const baseApiUrl = `http://localhost:3000`
export async function getUsers(usuarios){
    try{
        const response = await fetch(baseApiUrl+'/usuarios');
        
        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }

        const users = await response.json();
        return users
    }catch(err){
        console.error(err);        
    }
    
} 

export async function createUser(user){
    console.log(user)
    try {
        const response = await fetch(baseApiUrl+'/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return response.ok;
    
    } catch (error) {
        console.error('Error de red:', error);
        alert('Hubo un error de conexión. Inténtalo de nuevo más tarde.');
    }
}

export async function deleteUser(id_usuario){
    try {
        const response = await fetch(baseApiUrl+`/usuarios/${id_usuario}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
           if (!response.ok) {
            throw new Error('Error al eliminar usuario.');
        }

        return response.ok;
    }catch(err){
        console.error('Error al eliminar usuario', err);
        alert('Hubo un error al eliminar el usuario. Inténtalo de nuevo más tarde.');
    }
}

export async function putUser(){

}

