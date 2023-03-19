import { sq_connection } from "./models/index.js";
import { seedOrders } from "./seeders/seed_orders.js";
import { seedItems } from "./seeders/seed_items.js";

const startPostgres = () => {
  sq_connection.drop().then(() => {
    sq_connection
      .sync()
      .then(() => {
        seedOrders();
        seedItems();
        console.log("Database successfully connected");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });
};

export default startPostgres;
