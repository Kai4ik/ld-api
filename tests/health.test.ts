import request, { Response } from "supertest";
import app from "../src/server.js";

describe("/API health check", () => {
  test("response should be 404", async () => {
    const res: Response = await request(app).get("/");
    expect(res.statusCode).toBe(404);
  });
});
