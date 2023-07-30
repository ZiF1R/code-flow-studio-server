import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Users } from "../models/user.model";

export default (): {port: Number, database: SequelizeModuleOptions} => ({
  port: Number(process.env.PORT) || 3001,
  database: {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    models: [Users],
  }
});
