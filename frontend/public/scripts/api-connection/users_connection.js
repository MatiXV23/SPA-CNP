export async function getUsers(){
    try{
        const response = await fetch('http://localhost:3000/usuarios');
        
        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }

        const users = await response.json();
    }catch(err){
        console.error(err);        
    }
    
} 

export async function createUser(user){
    console.log(user)
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.ok;
    
    } catch (error) {
        console.error('Error de red:', error);
        alert('Hubo un error de conexión. Inténtalo de nuevo más tarde.');
    }
}

export async function deleteUser(id_usuario){
    try {
        const response = await fetch(`http://localhost:3000/users/${id_usuario}`, {
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

