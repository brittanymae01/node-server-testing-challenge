const User = require("../api/server");
const request = require("supertest");

describe("users-router", function() {
  describe("DELETE /:id", function() {
    it("deletes a user", function() {
      return request(User)
        .delete("/api/users/2")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("returns json", function() {
      return request(User)
        .delete("/api/users/2")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
