
export function getNavTemplate(){
    return `
    <nav class="w-full mb-6  py-3 flex items-center justify-center bg-gray-800">
        <div class="flex justify-around w-md items-center">
            <button id="nav-list-btn" class="cursor-pointer  block rounded-lg p-2 text-lg font-bold text-blue-300 hover:bg-gray-700 hover:underline">Listar usuarios</button>
            <button id="nav-create-btn" class="cursor-pointer -mx-3 block rounded-lg p-2 text-lg font-bold text-blue-300 hover:bg-gray-700 hover:underline">Crear usuario</button>
            <button id="nav-login-btn" class="cursor-pointer -mx-3 block rounded-lg p-2 text-lg font-bold text-blue-300 hover:bg-gray-700 hover:underline">Login</button>
            <button id="nav-logout-btn" class="cursor-pointer -mx-3 block rounded-lg p-2 text-lg font-bold text-blue-300 hover:bg-gray-700 hover:underline">LogOut</button>
        </div>
    </nav>

    <h1 class="text-5xl font-semibold py-6 tracking-tight mb-10 text-balance text-white text-center">Sistema de Gestión de Usuarios</h1>
    `
}