import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../../../model/usuario_model.ts"

const usersByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("", {
        onRequest: fastify.authenticate,
        schema:{
            tags: ['Usuarios'],
            summary: 'Obtener usuario',
            description: 'Devuelve el usuario con id indicada por parametro.', 
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: {
                200: usuarioSchema
            },
            security: [
                { bearerAuth: [] }
            ]
        }
    },async function (request, reply){
        const {id_usuario} = request.params
        return fastify.UsersDB.getById(id_usuario)
    })


    fastify.put("",{
        onRequest: fastify.authenticate,
        schema:{
            tags: ['Usuarios'],
            summary: 'Modificar usuario',
            description: 'Modifica el usuario con id indicada por parametro.',  
            body: usuarioSchema,
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: 204,
            security: [
                { bearerAuth: [] }
            ]
        },
        preHandler: [fastify.authorizeAdmin ,fastify.verifyParamsId]
    }, async function (request, reply){
            await fastify.UsersDB.update(request.params.id_usuario, request.body)
            reply.code(204).send()
    })

    fastify.delete("",{
        onRequest: fastify.authenticate,
        schema:{
            tags: ['Usuarios'],
            summary: 'Borra usuario',
            description: 'Elimina el usuario con id indicada por parametro.',  
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: 204,
            security: [
                { bearerAuth: [] }
            ]
        },
        preHandler: fastify.authorizeAdmin,
    }, async function (request, reply){
        await fastify.UsersDB.delete(request.params.id_usuario)
        reply.code(204).send()
    })
}

export default usersByIdRoutes