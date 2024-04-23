import { config } from "dotenv"
config()

//PORTS
export const PORT                 =     process.env.PORT || 4000
//export const PORTSOCKET           =     process.env.PORTSOCKET

//FRONTEND
export const LINKFRONT            =     process.env.LINKFRONT

//DB
export const MYSQLDATABASE        =     process.env.MYSQLDATABASE
export const MYSQLHOST            =     process.env.MYSQLHOST
export const MYSQLPORT            =     process.env.MYSQLPORT
export const MYSQLUSER            =     process.env.MYSQLUSER
export const MYSQL_ROOT_PASSWORD  =     process.env.MYSQL_ROOT_PASSWORD

//JWT
export const JWT_TOKEN            =     process.env.JWT_TOKEN