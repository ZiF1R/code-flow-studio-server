import { SequelizeModuleOptions } from "@nestjs/sequelize";

export default (): {port: Number, database: SequelizeModuleOptions} => ({
  port: Number(process.env.PORT) || 3001,
  database: {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    autoLoadModels: true,
  }
});

export const getJwtSecret = () => ({
  token: process.env.JWT_SECRET
})
