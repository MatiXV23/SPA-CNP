import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    id_usuario: Type.Integer({minimum: 1}),
    is_admin: Type.Boolean(),
    username: Type.String({maximum: 15}),
    email: Type.String(),
    nombres: Type.String({maximum:50}),
    apellidos: Type.String({maximum:50}),
    foto_url: Type.Optional(Type.String({maxLength:520}))
})

export const queryUsuarioSchema = Type.Object({
    nombre : Type.Optional(Type.String()),
    username : Type.Optional(Type.String()),
    is_admin: Type.Optional(Type.Boolean()),
})

export const credencialesSchema = Type.Object({
    username : Type.String({minLength: 2, default: 'admin'}),
    password : Type.String({minLength: 2, default: 'contraseña'})
})


export type Credenciales = Static<typeof credencialesSchema>
export type Usuario = Static<typeof usuarioSchema>

