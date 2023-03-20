import request, { Response } from "supertest";
import app from "../src/server.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("GET /v1/api/items", () => {
  // Invalid user role - seller cannot place an order
  test("invalid role - buyer", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/orders")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe(
      "Not Authorized to perform this action. You should be logged in as a buyer"
    );
  });

  // Invalid item to update - if itemID in provided array of itemIDs is invalid - fail
  test("invalid item to update", async () => {
    const token = await getJwt("test_buyer@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/orders")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemsIDs: ["70a4bafc-c619-11ed-afa1-0242ac120045"],
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe("Tried to update non-existing item");
  });

  //Successful creation of order & items are updated
  test("valid items ids - order successfully created", async () => {
    const token = await getJwt("test_buyer@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/orders")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemsIDs: ["6a4aefb2-c614-11ed-afa1-0242ac120002"],
      });
    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("orderId");
  });
});
