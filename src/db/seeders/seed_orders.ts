import { sq_connection } from "../models/index.js";

const queryInterface = sq_connection.getQueryInterface();
export const seedOrders = () => {
  queryInterface.bulkInsert("orders", [
    {
      id: "9f3be4bc-c619-11ed-afa1-0242ac120002",
      orderDate: new Date("2022-3-16"),
      orderBy: "test_buyer@gmail.com",
    },
  ]);
};
