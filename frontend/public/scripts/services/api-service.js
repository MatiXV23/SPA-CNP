function getAuthToken() {
    return localStorage.getItem("AuthToken");
}

export async function get(url){
    const token = getAuthToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener la lista de usuarios');
    }

    const data = await response.json();
    return data
}





export async function postForLogin(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }

    return await response.json();
}





export async function post(url, body){
    const token = getAuthToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Error al crear usuario');
    }

    const data = await response.json();
    return data
}




export async function put(url, body){
    const token = getAuthToken();
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar usuario')
    }

    return await response.json();
}




export async function del(url){
    const token = getAuthToken();
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 
            'Authorization' : `Bearer ${token}`
        },
    });
    
    if (!response.ok) {
        throw new Error('Error al eliminar usuario.');
    }

    return null;
}