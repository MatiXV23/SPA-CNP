import fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify({ logger: true });

server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/'
});

const port = Number(process.env.FRONT_PORT)  || 4000;
const host = '::';

try{
    await server.listen({ port, host });
} catch(err) {
    server.log.error(err);
    process.exit(1);
}
