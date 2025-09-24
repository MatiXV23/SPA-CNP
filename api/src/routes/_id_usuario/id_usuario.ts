import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import { usuarioSchema } from "../../model/usuario_model.ts"

const usersByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get("/", {
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


    fastify.put("/",{
        schema:{
            tags: ['Usuarios'],
            summary: 'Modificar usuario',
            description: 'Modifica el usuario con id indicada por parametro.',  
            body: usuarioSchema,
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: 201
        },
        preHandler: fastify.verifyParamsId
    }, async function (request, reply){
        fastify.UsersDB.update(request.params.id_usuario, request.body)
        reply.code(201).send()
    })

    fastify.delete("/",{
        schema:{
            tags: ['Usuarios'],
            summary: 'Borra usuario',
            description: 'Elimina el usuario con id indicada por parametro.',  
            params : Type.Pick(usuarioSchema, ["id_usuario"]),
            response: 201
        }
    }, async function (request, reply){
        const {id_usuario} = request.params
        fastify.UsersDB.delete(id_usuario)
        reply.code(201).send()
    })
}

export default usersByIdRoutes