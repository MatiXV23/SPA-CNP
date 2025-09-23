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

server.get('/', async (request, reply) => {
    return reply.sendFile('index.html');
});

server.listen({ port: 4000, host: 'localhost' }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Frontend corriendo en ${address}`);
});
