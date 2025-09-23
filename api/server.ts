import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifyFormbody from "@fastify/formbody";
// import fastifyStatic from "@fastify/static";
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url'
import autoLoad from '@fastify/autoload'
import cors from "@fastify/cors";
import fastify from 'fastify';

const archivo = fileURLToPath(import.meta.url)
const ruta = join(dirname(__filename), 'src')

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>();

await server.register(fastifyFormbody);

await server.register(cors, {
    origin: "http://localhost:4000",
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

const port = Number(process.env.API_PORT) || 4000;
const host = '::';

// await server.register(fastifyStatic, {
// root: ruta,
// prefix: "/"
// });

try{
    await server.listen({ port, host });
} catch(err) {
    server.log.error(err);
    process.exit(1);
}