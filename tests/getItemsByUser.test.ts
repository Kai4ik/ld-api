import request, { Response } from "supertest";
import app from "../src/server.js";
import Item from "../src/db/models/items.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("GET /v1/api/itemsByUSer", () => {
  // No user query param
  test("user query param not provided", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .get("/v1/api/itemsByUser")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.error.message).toBe("User should be provided");
  });

  // user query param given
  test("successful fetch of items data for 2 users", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res2: Response = await request(app)
      .get("/v1/api/itemsByUser?user=test_seller2@gmail.com")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res2.statusCode).toBe(200);
    const itemsForUser2: Item[] = res2.body.items;
    expect(itemsForUser2.length).toBe(1);

    const res: Response = await request(app)
      .get("/v1/api/itemsByUser?user=test_seller@gmail.com")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res2.statusCode).toBe(200);
    const itemsForUser1: Item[] = res.body.items;
    expect(itemsForUser1.length).toBe(3);
  });
});
