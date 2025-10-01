import {type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../../model/usuario_model.ts"



const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("", {
        onRequest: fastify.authenticate,
        schema:{
            tags: ['Usuarios'],
            summary: 'Obtener usuarios',
            description: 'Devuelve una lista de todos los usuarios', 
            response: {
                200: Type.Array(usuarioSchema)
            },
            security: [
                { bearerAuth: [] }
            ]
        }
    },async function (request, reply){
        return fastify.UsersDB.getAll()
    })


    fastify.post("",{
        onRequest: fastify.authenticate,
        schema:{ 
            tags: ['Usuarios'],
            summary: 'Crea usuario',
            description: 'Crea un usuario', 
            body: Type.Omit(usuarioSchema, ["id_usuario"]),
            security: [
                { bearerAuth: [] }
            ]
        },
        preHandler: fastify.authorizeAdmin,
    }, async function (request, reply){
        const user = await fastify.UsersDB.create(request.body)
        return reply.status(201).send(user);
    })
}   

export default usersRoutes