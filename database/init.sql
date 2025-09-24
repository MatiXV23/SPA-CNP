-- Script solo váliddo para nuestro ambiente de desarrollo.
-- Tener en cuenta que al borrar y volver a crear la tabla, se pierden todos los datos
-- Pero con este propio script cargamos todos los datos iniciales.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;


DROP TABLE IF EXISTS usuarios;
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    is_admin BOOLEAN NOT NULL,
    username VARCHAR(15) NOT NULL UNIQUE,
    email CITEXT  NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL
);

-- Tabla con solo el hash
CREATE TABLE IF NOT EXISTS credenciales (
    id_usuario INTEGER NOT NULL PRIMARY KEY REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    password_hash TEXT NOT NULL
)
;

-- Dar de alta 1 admin y 2 usuarios normales.
WITH nuevos_usuarios AS (
  INSERT INTO usuarios (is_admin, username, email, nombres)
    VALUES 
    (TRUE,'admin', 'admin@example.com','Admin'),
    (FALSE, 'user', 'user1@example.com', 'Usuario'),
    (FALSE, 'user2', 'user2@example.com', 'Usuario')
  RETURNING id_usuario
)
INSERT INTO credenciales (id_usuario, password_hash)
SELECT id_usuario, crypt('pass', gen_salt('bf')) 
FROM nuevos_usuarios
;
