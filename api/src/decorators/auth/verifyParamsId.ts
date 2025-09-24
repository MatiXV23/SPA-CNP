import fastifyPlugin from "fastify-plugin";
import type { FastifyReplyType, FastifyRequestType } from "fastify/types/type-provider";
import { PC_BadRequest } from "../../errors/errors.ts";

export default fastifyPlugin(async function(fastify){
    fastify.decorate("verifyParamsId", async (req: FastifyRequestType, rep: FastifyReplyType) => {
        if (req.params.id_usuario !== req.body.id_usuario) throw new PC_BadRequest("Los ids pasados como parametro y en el body no coinciden")
    })
})

declare module 'fastify'{
    interface FastifyInstance {
        verifyParamsId(req: FastifyRequestType, rep: FastifyReplyType): Promise<void>
    }
}