// FUNCION PARA DEVOLVER EL HTML TEMPLATE DEL FORM DE CREACION DE USUARIOS 

export const creationFormTemplate = `
        <h2 id="form-title">Creación de un nuevo usuario</h2>
        <form id="create-user-form">
            <label for="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" required>
            <br><br>
            <label for="is_admin">Administrador:</label>
            <input type="checkbox" id="is_admin">
            <br><br>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br><br>
            <button type="submit" id="submit-btn">Guardar</button>
            <button type="button" id="cancel-btn">Cancelar</button>
        </form>
        <br>
        <br>
    `
