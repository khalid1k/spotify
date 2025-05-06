import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number (process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [
    __dirname + '/../modules/**/*.entity{.ts,.js}',
    __dirname + '/../modules/**/entities/*.entity{.ts,.js}',
  ],
  synchronize: false, 
  migrations: ["dist/migrations/*.js"],
};

const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;