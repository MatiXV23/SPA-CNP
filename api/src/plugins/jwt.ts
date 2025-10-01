// src/plugins/jwt.ts

import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { PC_NotFound } from "../errors/errors.ts";
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify"; 


declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: number; username: string; is_admin: boolean }; 
    user: { sub: number; username: string; is_admin: boolean };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorizeAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
    const secret = process.env.JWT_SECRET || '';
    if (!secret) throw new PC_NotFound("Falta setear el secret.");

    await fastify.register(jwt, {secret});
   
    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch {
        return reply.code(401).send({ error: 'Token inválido' });
      }
    });
    
    fastify.decorate('authorizeAdmin', async function (request: FastifyRequest, reply: FastifyReply) {
      if (!request.user?.is_admin) {
        return reply.code(403).send({ error: 'Solo admin' });
      }
    });

});

export default jwtPlugin;