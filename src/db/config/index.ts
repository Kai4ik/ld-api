import { Dialect } from "sequelize";

export const config: {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
} = {
  username: process.env["DB_USER"] as string,
  password: process.env["DB_PASSWORD"] as string,
  database: process.env["DB_DBNAME"] as string,
  host: process.env["DB_HOST"] as string,
  dialect: "postgres",
  logging: false,
};
