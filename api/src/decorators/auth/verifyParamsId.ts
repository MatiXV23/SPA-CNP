import fastifyPlugin from "fastify-plugin";
import type { FastifyReplyType, FastifyRequestType } from "fastify/types/type-provider";
import { PC_BadRequest } from "../../errors/errors.ts";

export default fastifyPlugin(async function(fastify){
    fastify.decorate("verifyParamsId", async (req: FastifyRequestType, rep: FastifyReplyType) => {
            const paramId = req.params.id_usuario;
            const bodyId = req.body?.id_usuario;

            // Solo valida si el body trae id
            if (bodyId !== undefined && paramId !== bodyId) {
                throw new PC_BadRequest("Los ids pasados como parámetro y en el body no coinciden");
    }})
})

declare module 'fastify'{
    interface FastifyInstance {
        verifyParamsId(req: FastifyRequestType, rep: FastifyReplyType): Promise<void>
    }
}