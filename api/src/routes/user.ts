import {type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../model/usuario_model.ts"
import { Type } from "@sinclair/typebox"

const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("/", {
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


    fastify.post("/",{
        schema:{ 
            tags: ['Usuarios'],
            summary: 'Crea usuario',
            description: 'Crea un usuario', 
            body: Type.Omit(usuarioSchema, ["id_usuario"])
        }
    }, async function (request, reply){
        fastify.UsersDB.create(request.body)
        reply.code(201).send()
    })
}   

export default usersRoutes