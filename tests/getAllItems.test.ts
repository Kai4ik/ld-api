import request, { Response } from "supertest";
import app from "../src/server.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("GET /v1/api/items", () => {
  // Successfully got items data
  test("item successfully fetched", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .get("/v1/api/items")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("items");
  });
});
