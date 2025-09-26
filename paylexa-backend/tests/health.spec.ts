import request from "supertest";
import { app } from "../src/app";

describe("GET /api/health", () => {
  it("returns ok status", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toMatchObject({
      status: "ok",
      service: "paylexa-backend",
    });
    expect(response.body.timestamp).toBeDefined();
  });
});
