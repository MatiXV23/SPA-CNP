export async function get(url){
    console.log(url)
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Error al obtener la lista de usuarios');
    }

    const data = await response.json();
    return data
}




export async function post(url, body){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar usuario')
    }

    return await response.json();
}




export async function del(url){
    const response = await fetch(url, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error('Error al eliminar usuario.');
    }
}