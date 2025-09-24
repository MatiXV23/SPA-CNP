import fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url'
import autoLoad from '@fastify/autoload'
import cors from "@fastify/cors";

const archivo = fileURLToPath(import.meta.url)
const ruta = join(dirname(archivo), 'src')

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>();

const front_port = Number(process.env.API_PORT) || 4000;
await server.register(cors, {
    origin: `http://localhost:${front_port}`,
    methods: ["GET", "POST", "PUT", "DELETE"]
});


await server.register(autoLoad, {
    dir: join(ruta, 'plugins')
})

await server.register(autoLoad, {
    dir: join(ruta, 'decorators')
})

server.register(autoLoad, {
    dir: join(ruta, 'routes'),
    routeParams: true
})

const port = Number(process.env.API_PORT) || 3000;
const host = '::';

try{
    await server.listen({ port, host });
} catch(err) {
    server.log.error(err);
    process.exit(1);
}