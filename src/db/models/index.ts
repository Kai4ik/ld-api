import { Sequelize } from "sequelize-typescript";
import { config } from "../config/index.js";
import Item from "./items.js";
import Order from "./order.js";

export const sq_connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    models: [Item, Order],
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
