import { config } from "dotenv"
config()

export const variables = {
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLPORT: process.env.MYSQLPORT,
    MYSQLUSER: process.env.MYSQLUSER,
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    JWT_TOKEN: process.env.JWT_TOKEN
}