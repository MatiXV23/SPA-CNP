export function printLoginForm() {
    const contentContainer = document.getElementById('content-container');   
    const formularioLogin = `
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="m-auto sm:w-full sm:max-w-sm">
                <img src="https://www.ucu.edu.uy/plantillas/images/logo_ucu.svg" class="mx-auto h-14 w-auto" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">Inicia sesion a tu cuenta</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" class="space-y-6">
                    <div>
                        <label for="username" class="block text-left text-sm/6 font-medium">Nombre de Usuario</label>
                        <div class="mt-2">
                            <input id="username" type="text" name="username" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-left text-sm/6 font-medium">Clave de seguridad</label>
                        <div class="mt-2">
                            <input id="password" type="password" name="password" require class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" id="login-btn" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
            </div>
        </div>

    `
    contentContainer.innerHTML = formularioLogin
    return
}