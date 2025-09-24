import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../../../model/usuario_model.ts"
import { PC_NotImplemented } from "../../../errors/errors.ts"
import { Type } from "@sinclair/typebox"

const usersByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("", {
        schema:{
            tags: ['Usuarios'],
            summary: 'Obtener usuario',
            description: 'Devuelve el usuario con id indicada por parametro.', 
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: {
                200: usuarioSchema
            }
        }
    },async function (request, reply){
        const {id_usuario} = request.params
        return fastify.UsersDB.getById(id_usuario)
    })


    fastify.put("",{
        schema:{
            tags: ['Usuarios'],
            summary: 'Modificar usuario',
            description: 'Modifica el usuario con id indicada por parametro.',  
            body: Type.Partial(usuarioSchema),
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: { 200: usuarioSchema }
        },
        preHandler: fastify.verifyParamsId
    }, async function (request, reply){
         try {
            console.log("PUT request.body:", request.body)
            console.log("PUT request.params:", request.params)
            const updatedUser = await fastify.UsersDB.update(request.params.id_usuario, request.body)
            reply.code(200).send(updatedUser)
        } catch (err) {
            console.error(err)
            reply.status(500).send({ message: "Error en el servidor" })
        }
    })

    fastify.delete("",{
        schema:{
            tags: ['Usuarios'],
            summary: 'Borra usuario',
            description: 'Elimina el usuario con id indicada por parametro.',  
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: 201
        }
    }, async function (request, reply){
        try {
            await fastify.UsersDB.delete(request.params.id_usuario)
            reply.code(201).send()
        } catch (err) {
            console.error(err)
            reply.status(500).send({ message: "Error al eliminar usuario" })
        }
    })
}

export default usersByIdRoutes