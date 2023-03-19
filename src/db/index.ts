import { sq_connection } from "./models/index.js";
import { seedOrders } from "./seeders/seed_orders.js";
import { seedItems } from "./seeders/seed_items.js";

import { pino } from "pino";

const logger = pino();

const startPostgres = () => {
  sq_connection.drop().then(() => {
    sq_connection
      .sync()
      .then(() => {
        seedOrders();
        seedItems();
        logger.info("Database successfully connected");
      })
      .catch((err) => {
        logger.info("Error", err);
      });
  });
};

export default startPostgres;
