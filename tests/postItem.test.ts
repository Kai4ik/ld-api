import request, { Response } from "supertest";
import app from "../src/server.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("POST /v1/api/items", () => {
  // Invalid user role - buyer cannot create item
  test("invalid role - buyer", async () => {
    const token = await getJwt("test_buyer@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe(
      "Not Authorized to perform this action. You should be logged in as a seller"
    );
  });

  // Invalid body - item violates itemStatus field rules
  test("invalid body - not valid itemStatus", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemTitle: "newItem",
        itemDescription: "description for the new item",
        itemPrice: 26.6,
        itemStatus: "invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe(
      '"itemStatus" must be one of [sold, on sale]'
    );
  });

  // Invaliduser body - item violates itemTitle field rules
  test("invalid body - empty itemTitle", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemTitle: "",
        itemDescription: "description for the new item",
        itemPrice: 26.6,
        itemStatus: "on sale",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe(
      '"itemTitle" is not allowed to be empty'
    );
  });

  // Invalid body - item violates itemPrice field rules
  test("invalid body - price should be of type double", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemTitle: "new item title",
        itemDescription: "description for the new item",
        itemPrice: "not number",
        itemStatus: "on sale",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe('"itemPrice" must be a number');
  });

  // Valid body - seller creates new item and get itemId in response
  test("valid body - item successfully created", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .post("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json")
      .send({
        itemTitle: "new item title",
        itemDescription: "description for the new item",
        itemPrice: 24.5,
        itemStatus: "on sale",
        soldBy: "test_seller@gmail.com",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("itemID");
  });
});
