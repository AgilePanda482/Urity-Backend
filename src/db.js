// db.js
import { createPool } from "mysql2/promise";
import { variables } from "./config";
const { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQL_ROOT_PASSWORD, MYSQLDATABASE } = variables;

export const pool = async () => {
    try{
        const connection = await createPool({
            host: MYSQLHOST,
            port: MYSQLPORT,
            user: MYSQLUSER,
            password: MYSQL_ROOT_PASSWORD,
            database: MYSQLDATABASE
        })
        return connection
    } catch (error) {
        console.error(`Error al intentar conectar a la base de datos: ${error}`)
    }
};
