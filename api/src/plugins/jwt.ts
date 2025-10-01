// src/plugins/jwt.ts
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { PC_Forbidden, PC_NoAuthorized, PC_NotFound } from "../errors/errors.ts";
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify"; 
import { type Usuario } from "../model/usuario_model.ts";


declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Usuario 
    user: Usuario
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
        throw new PC_NoAuthorized();
      }
    });
    
    fastify.decorate('authorizeAdmin', async function (request: FastifyRequest, reply: FastifyReply) {
      if (!request.user?.is_admin) {
        throw new PC_Forbidden('Solo permitido con un usuario Admin')
      }
    });

});

export default jwtPlugin;