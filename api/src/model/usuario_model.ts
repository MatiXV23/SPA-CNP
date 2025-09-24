import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    id_usuario: Type.Integer({minimum: 1}),
    is_admin: Type.Boolean(),
    username: Type.String({maxLength: 15}),
    email: Type.String(),
    nombres: Type.String({maxLength:50}),
})

export const queryUsuarioSchema = Type.Object({
    nombres : Type.Optional(Type.String({maxLength: 50})),
    username : Type.Optional(Type.String({maxLength: 15})),
    is_admin: Type.Optional(Type.Boolean()),
})

export const credencialesSchema = Type.Object({
    username : Type.String({maxLength: 15, default: 'admin'}),
    password : Type.String({minLength: 2, default: 'contraseña'})
})


export type Credenciales = Static<typeof credencialesSchema>
export type Usuario = Static<typeof usuarioSchema>

