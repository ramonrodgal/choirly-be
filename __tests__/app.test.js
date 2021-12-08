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

describe("/api/users/:username", () => {
  test("status:200 responds with a user object", async () => {
    const username = "josephCode";
    const {
      body: { user },
    } = await request(app).get(`/api/users/${username}`).expect(200);

    expect(user.username).toBe(username);
  });
  test("status:404 responds with a message", async () => {
    const username = "notAUser";
    const {
      body: { msg },
    } = await request(app).get(`/api/users/${username}`).expect(404);

    expect(msg).toBe("User not found");
  });
});

describe("/api/choirs", () => {
  test("status:200 responds with an array of choirs", async () => {
    const {
      body: { choirs },
    } = await request(app).get("/api/choirs").expect(200);
    expect(choirs.length).toBe(3);

    const choirTest = {
      _id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      description: expect.any(String),
      leaader: expect.any(String),
    };

    choirs.forEach((choir) => {
      expect(choir).toMatchObject(choirTest);
    });
  });
});

describe("/api/choirs/:choir_id", () => {
  test("status:200 responds with an single choir", async () => {
    const choir_id = "61b0c478a1a352f4350523c6";
    const {
      body: { choir },
    } = await request(app).get(`/api/choirs/${choir_id}`).expect(200);

    expect(choir._id).toBe(choir_id);
  });
  test.only("status 404 responds with a message", async () => {
    const choir_id = "not-valid-id";
    const {
      body: { msg },
    } = await request(app).get(`/api/choirs/${choir_id}`).expect(404);

    expect(msg).toBe("Choir not found");
  });
});
