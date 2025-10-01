import { credencialesSchema } from "../../model/usuario_model.ts";
import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";


const authRoute: FastifyPluginAsyncTypebox = async(server) =>{
    server.post('', {
        schema: {
            tags: ['Auth'],
            body: credencialesSchema,
            response: {
                200: Type.Object({'token': Type.String()}),
            },
            
      },
    }, async (request, reply) => {
      const cuenta = await server.UsersDB.getUserByCredentials(request.body);
      const payload = cuenta
      const token = server.jwt.sign(payload, { expiresIn: '8h' });
      return { token };
    }
  );
};

export default authRoute;
