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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear usuario');
        }

        return await response.json();
    
    } catch (error) {
        console.error('Error de red:', error);
        alert('Hubo un error de conexión. Inténtalo de nuevo más tarde.');
    }
}

export async function deleteUser(id_usuario){
    try {
        const response = await fetch(baseApiUrl+`/usuarios/${id_usuario}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar usuario.');
        }

        return true;
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        return false;
    }
}

export async function putUser(id_usuario, userData) {
    try {
        const response = await fetch(`${baseApiUrl}/usuarios/${id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar usuario');
        }

        return await response.json();
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        throw new Error(err.message || 'Error de conexión con el servidor');
    }
}