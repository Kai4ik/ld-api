import request, { Response } from "supertest";
import app from "../src/server.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("DELETE /v1/api/items", () => {
  // Invalid user role - buyer cannot delete item
  test("invalid role - buyer", async () => {
    const token = await getJwt("test_buyer@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .del("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe(
      "Not Authorized to perform this action. You should be logged in as a seller"
    );
  });

  // Non-existing item
  test("non-existing item - deletion should fail", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .del("/v1/api/items")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token.token}`)
      .send({
        itemID: "8539a626-c619-113d-afa1-0242ac120002",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe("Item does not exist");
  });

  // Invalid item id - not of type uuid
  test("invalid item id (not uuid) - deletion should fail", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .del("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .send({
        itemID: "8539a626-c619-113d-af02",
      });
    expect(res.statusCode).toBe(500);
    expect(res.body.error.message).toBe(
      'invalid input syntax for type uuid: "8539a626-c619-113d-af02"'
    );
  });

  // Existing item - successful deletion
  test("valid item - item successfully deleted", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .del("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`)
      .send({
        itemID: "8539a626-c619-11ed-afa1-0242ac120002",
      });
    expect(res.statusCode).toBe(204);
  });
});
