import { Pool , type PoolConfig } from "pg";

const pgConfig: PoolConfig = {
    user: "MINOMBRECHULO",        
    password: "LACONTRASEÑASECRETA", 
    host: "ELPINCHEHOST",
    port: 5432,
    database: "LAPROHIBIDA",     
    max: 10,
};

export const myPool = new Pool(pgConfig)

// NO SE QUE PASABA QUE CON process.env.PGDATO NO ME CARGABA LA DB
// TUVE QUE PONER TODOS LOS DATOS DIRECTOS PARA PODER CONECTARME