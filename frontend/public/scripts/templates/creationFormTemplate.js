// FUNCION PARA DEVOLVER EL HTML TEMPLATE DEL FORM DE CREACION DE USUARIOS 
const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
export const creationFormTemplate = `
    <h2 id="form-title" class="text-2xl font-semibold tracking-tight mb-10 text-balance text-white text-center">Creación de un nuevo usuario</h2>
    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-w-4xl m-auto">
        <form id="create-user-form" class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
            <label for="nombres" class="${labelClass}" >Nombres:</label>
            <input type="text" id="nombres" name="nombres" class="${inputClass}" required>
        </div>
        <div>
            <label for="is_admin" class="${labelClass}">Administrador:</label>
            <input type="checkbox" id="is_admin" >
        </div>
        <div>
            <label for="username" class="${labelClass}">Username:</label>
            <input type="text" id="username" name="username" class="${inputClass}" required>
        </div>
        <div>
            <label for="email" class="${labelClass}">Email:</label>
            <input type="email" id="email" name="email" class="${inputClass}" required>
        </div>
        <div class="justify-self-center">
            <button type="submit" id="submit-btn" class="mt-6 cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-green-600 hover:bg-white/5">Guardar</button>
        </div>
        <div class="justify-self-center">
            <button type="button" id="cancel-btn" class="mt-6 cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white bg-red-600 hover:bg-white/5">Cancelar</button>
        </div>
            
            
        </form>
        <br>
        <br>
    </div>
    `
