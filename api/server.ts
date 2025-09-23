import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import { dirname, join } from 'node:path';
import {PC_NotImplemented} from "./errors/errors.ts"
import cors from "@fastify/cors";
import fastify from 'fastify';

const server = fastify({logger:true});
const ruta = join(dirname(process.argv[1]), "../frontend/public");

await server.register(fastifyFormbody);
await server.register(cors, {
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"]
});
await server.register(fastifyStatic, {
root: ruta,
prefix: "/"
});

server.get("/usuarios", async(req, rep) => {
    throw new PC_NotImplemented()
})

server.post("/usuarios", async(req, rep) => {
    throw new PC_NotImplemented()
})

server.put("/usuarios", async(req, rep) => {
    throw new PC_NotImplemented()
})

server.delete("/usuarios", async(req, rep) => {
    throw new PC_NotImplemented()
})

try{
    await server.listen({port: 3000})
} catch(err) {
    server.log.error(err);
    process.exit(1);
}