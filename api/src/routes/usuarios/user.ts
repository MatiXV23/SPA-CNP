import {type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../../model/usuario_model.ts"
import { Type } from "@sinclair/typebox"


const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("", {
        onRequest: [fastify.authenticate],
        schema:{
            tags: ['Usuarios'],
            summary: 'Obtener usuarios',
            description: 'Devuelve una lista de todos los usuarios', 
            response: {
                200: Type.Array(usuarioSchema)
            }
        }
    },async function (request, reply){
        return fastify.UsersDB.getAll()
    })


    fastify.post("",{
        onRequest: [fastify.authenticate, fastify.authorizeAdmin],
        schema:{ 
            tags: ['Usuarios'],
            summary: 'Crea usuario',
            description: 'Crea un usuario', 
            body: Type.Omit(usuarioSchema, ["id_usuario"])
        }
    }, async function (request, reply){
        try {
            const user = await fastify.UsersDB.create(request.body)
            return reply.status(201).send(user);
        } catch(err: any){
            if (err.message.includes("ya existe")) {
            return reply.status(409).send({ message: err.message }) // Conflict
        }
        return reply.status(500).send({ message: "Error interno del servidor" })
        }
    })
}   

export default usersRoutes