import { createPool } from "mysql2/promise";
import { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQL_ROOT_PASSWORD, MYSQLDATABASE } from "./config.js";

export const pool = createPool({
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQLDATABASE
});
