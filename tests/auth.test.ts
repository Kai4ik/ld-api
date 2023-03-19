import request, { Response } from "supertest";
import app from "../src/server.js";
import { getJwt } from "../src/utils/cognito_test.js";

describe("API User Verification", () => {
  // If the request is missing the Authorization header, it should be forbidden
  test("no authorization header", async () => {
    const res: Response = await request(app).get("/");
    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe(
      "Not Authorized. Authorization header is not set"
    );
  });

  // Invalid user/password pair
  test("invalid user/password", async () => {
    const token = await getJwt("test_seller@gmail.com", "randomPassword");
    const res: Response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.error.message).toBe("Not Authorized. Token is not valid");
  });

  // Valid user/password pair
  test("valid user/password", async () => {
    const token = await getJwt("test_seller@gmail.com", "12==qwOP");
    const res: Response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token.token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error.message).toBe("Route Not Found");
  });
});
