import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

const USERNAME = process.env.PGUSER
const PASSWORD = process.env.PGPASSWORD
const DOMAIN = process.env.PGHOST
const PORT = process.env.PGPORT
const DATABASE = process.env.PGDATABASE

const conectionLink = `postgres://${USERNAME}:${PASSWORD}@${DOMAIN}:${PORT}/${DATABASE}`;

export default fp(async (fastify) => {
    fastify.register(fastifyPostgres, {
        connectionString: conectionLink
    })
});

