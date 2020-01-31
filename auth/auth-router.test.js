const request = require("supertest");
const db = require("../data/dbConfig.js");
const Auth = require("../api/server");

describe("auth-router", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("Posting to register endpoint", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("responds with json", function() {
      return request(Auth)
        .post("/api/auth/register")
        .send({ username: "test", password: "test", department: "test" })
        .expect("Content-Type", /json/)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("should have username of hello", function() {
      return request(Auth)
        .post("/api/auth/register")
        .send({ username: "hello", password: "hello", department: "hello" })
        .expect("Content-Type", /json/)
        .then(res => {
          expect(res.body.username).toBe("hello");
        });
    });
  });
});
