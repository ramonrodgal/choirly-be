const request = require("supertest");
const app = require("../app");

describe("not valid url", () => {
  test('status:404 responds with the message "Invalid URL"', async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/not-valid-url").expect(404);
    expect(msg).toBe("Invalid URL");
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("status:200 responds with an array of users", async () => {
      const {
        body: { users },
      } = await request(app).get("/api/users").expect(200);

      expect(users.length).toBe(5);

      const userTest = {
        _id: expect.any(String),
        email: expect.any(String),
        username: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        phone_number: expect.any(Number),
      };

      users.forEach((user) => {
        expect(user).toMatchObject(userTest);
      });
    });
  });
});

describe.only("/api/users/:username", () => {
  test("status:200 responds with a user object", async () => {
    const username = "josephCode";
    const {
      body: { user },
    } = await request(app).get(`/api/users/${username}`).expect(200);

    expect(user.username).toEqual(username);
  });
});
