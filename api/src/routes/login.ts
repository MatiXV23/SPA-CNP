import { credencialesSchema } from "../model/usuario_model.ts";
import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { PC_NotFound, PC_NoAuthorized } from '../errors/errors.ts';
import type { FastifyReply, FastifyRequest } from "fastify";


const authRoute: FastifyPluginAsyncTypebox = async(server) =>{
    server.post('/login', {
        schema: {
            tags: ['Auth'],
            body: credencialesSchema,
            response: {
                200: Type.Object({'token': Type.String()}),
            },
            errorHandler: (err: Error, req: FastifyRequest, rep: FastifyReply) => {
                if (err instanceof PC_NotFound) return rep.code(401).send({ error: 'Credenciales incorrectas!' });
                console.error(err); 
        return rep.code(500).send({ error: 'Error interno' });
    }
        },
    }, async (request, reply) => {
      const cuenta = await server.UsersDB.getUserByCredentials(request.body);
      const payload = {
        sub: cuenta.id_usuario,
        username: cuenta.username,
        is_admin: cuenta.is_admin,
      };
      const token = server.jwt.sign(payload, { expiresIn: '8h' });
      return { token };
    }
  );
};

export default authRoute;
