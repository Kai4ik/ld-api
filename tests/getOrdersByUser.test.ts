import request, { Response } from "supertest";
import app from "../src/server.js";
import Order from "../src/db/models/order.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("GET /v1/api/orders", () => {
  // Invalid user role - seller cannot see the orders
  test("invalid role - seller", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .get("/v1/api/orders")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe(
      "Not Authorized to perform this action. You should be logged in as a buyer"
    );
  });

  // Valid user role - getting orders
  test("Valid role - successfully fetched orders", async () => {
    const token = await getJwt("test_buyer@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .get("/v1/api/orders")
      .set("Authorization", `Bearer ${token.token}`);

    expect(res.statusCode).toBe(200);
    const orders: Order[] = res.body.orders;
    expect(orders.length).toBe(1);
  });
});
