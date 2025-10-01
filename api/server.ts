import fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url'
import autoLoad from '@fastify/autoload'
import cors from "@fastify/cors";
import { PC_Error, PC_InternalServerError } from "./src/errors/errors.ts";
import jwtPlugin from './src/plugins/jwt.ts';
import swaggerPlugin from './src/plugins/swagger.ts';
import loginRoutes from './src/routes/login.ts';

const archivo = fileURLToPath(import.meta.url)
const ruta = join(dirname(archivo), 'src')

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>();

const front_port = process.env.API_PORT || 4000;
await server.register(cors, {
    origin: `http://localhost:4000`,
    methods: ["GET", "POST", "PUT", "DELETE"]
});

await server.register(jwtPlugin);

// await server.register(autoLoad, {
//     dir: join(ruta, 'plugins')
// })
server.register(swaggerPlugin);

await server.register(autoLoad, {
    dir: join(ruta, 'decorators')
})

server.register(autoLoad, {
    dir: join(ruta, 'routes'),
    routeParams: true,
})

const port = Number(process.env.API_PORT) || 3000;
const host = '::';


server.setErrorHandler((err: PC_Error, request, reply) => {
    if (!(err instanceof PC_Error)) err = new PC_InternalServerError()
    server.log.error(err);

    reply.status(err.statusCode).send({
        error: err.error,
        statusCode: err.statusCode,
        message: err.message
    });
});

try{
    await server.listen({ port, host });
} catch(err) {
    server.log.error(err);
    process.exit(1);
}