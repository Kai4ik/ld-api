import { sq_connection } from "../models/index.js";

const queryInterface = sq_connection.getQueryInterface();
export const seedItems = () => {
  queryInterface.bulkInsert("items", [
    {
      id: "70a4bafc-c619-11ed-afa1-0242ac120002",
      itemTitle: "Funkt Pop TYRANNOSAURUS REX",
      itemDescription:
        "Life finds a way. The dinosaurs have broken out of the park, but you can round them up for your Jurassic Park collection, starting with this Pop! of the Tyrannosaurus Rex. ",
      itemPrice: 12.0,
      itemStatus: "on sale",
      soldBy: "test_seller@gmail.com",
    },
    {
      id: "8539a626-c619-11ed-afa1-0242ac120002",
      itemTitle: "Funkt Pop ATROCIRAPTOR (RED)",
      itemDescription:
        "A big discovery is roaring your way! Capture exclusive Pop! Atrociraptor (Red) for your Jurassic World Dominion collection. Pop! Atrociraptor (Red) wants to follow you home and play a big role in expanding your set. Vinyl figure is approximately 3.60-inches tall.",
      itemPrice: 15.0,
      itemStatus: "on sale",
      soldBy: "test_seller@gmail.com",
    },
    {
      id: "8a4aefb2-c619-11ed-afa1-0242ac120002",
      itemTitle: "Funkt Pop Velociraptor Collectible Figure",
      itemDescription:
        "From Jurassic World 2, Blue (New Pose), as a stylized POP vinyl from Funko! Figure stands 3 3/4 inches and comes in a window display box",
      itemPrice: 23.5,
      itemStatus: "sold",
      soldBy: "test_seller@gmail.com",
      boughtBy: "test_buyer@gmail.com",
      orderId: "9f3be4bc-c619-11ed-afa1-0242ac120002",
    },
    {
      id: "6a4aefb2-c614-11ed-afa1-0242ac120002",
      itemTitle: "Funkt Pop Velociraptor Collectible Figure",
      itemDescription:
        "From Jurassic World 2, Blue (New Pose), as a stylized POP vinyl from Funko! Figure stands 3 3/4 inches and comes in a window display box",
      itemPrice: 23.5,
      itemStatus: "on sale",
      soldBy: "test_seller2@gmail.com",
    },
  ]);
};
