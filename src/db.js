// db.js
import { createPool } from "mysql2/promise";
import { variables } from "./config.js";
const { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQL_ROOT_PASSWORD, MYSQLDATABASE } = variables;

export const pool = createPool({
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQLDATABASE
});
