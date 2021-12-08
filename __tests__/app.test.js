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
  describe("POST", () => {
    test("status:201 responds with the posted user", async () => {
      const body = {
        email: "ramon@email.com",
        username: "ramonrodgal",
        first_name: "ramon",
        last_name: "rodriguez",
        phone_number: 8989898989,
      };
      const {
        body: { user },
      } = await request(app).post("/api/users").send(body).expect(201);

      expect(body.email).toBe(user.email);
      expect(body.username).toBe(user.username);
      expect(body.first_name).toBe(user.first_name);
      expect(body.last_name).toBe(user.last_name);
      expect(body.phone_number).toBe(user.phone_number);
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const body = {
        email: "ramon@email.com",
        username: "ramonrodgal",
        first_name: "ramon",
        phone_number: 8989898989,
      };
      const {
        body: { msg },
      } = await request(app).post("/api/users").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid data type", async () => {
      const body = {
        email: "ramon@email.com",
        username: "ramonrodgal",
        first_name: 42069,
        phone_number: "not valid number",
      };
      const {
        body: { msg },
      } = await request(app).post("/api/users").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/users/:username", () => {
  describe("GET", () => {
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
  describe("DELETE", () => {
    test("status:204 responds with the deleted user and a message", async () => {
      const username = "moonglade";
      const { body } = await request(app)
        .delete(`/api/users/${username}`)
        .expect(200);

      expect(body.user.username).toBe(username);
      expect(body.msg).toBe("User removed");
    });
    test("status:404 responds with a message for invalid username", async () => {
      const username = "invalid-username";
      const { body } = await request(app)
        .delete(`/api/users/${username}`)
        .expect(404);

      expect(body.msg).toBe("User not found");
    });
  });
});

describe("/api/choirs", () => {
  describe("GET", () => {
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
        leader: expect.any(String),
      };

      choirs.forEach((choir) => {
        expect(choir).toMatchObject(choirTest);
      });
    });
    test("status:200 responds with and array of choirs filtered by location", async () => {
      const location = "manchester";
      const {
        body: { choirs },
      } = await request(app)
        .get(`/api/choirs?location=${location}`)
        .expect(200);

      choirs.forEach((choir) => {
        expect(choir.location).toBe(location);
      });
    });
    test("status:404 responds with a message for invalid locations query", async () => {
      const location = "not-valid-location";
      const {
        body: { msg },
      } = await request(app)
        .get(`/api/choirs?location=${location}`)
        .expect(404);

      expect(msg).toBe("Choirs not found, invalid location");
    });
  });
  describe("POST", () => {
    test("status:200 responds with the posted choir", async () => {
      const body = {
        name: "Test Choir",
        location: "London",
        description: "We are a choir testing our voices",
        leader: "fake-user",
      };
      const {
        body: { choir },
      } = await request(app).post("/api/choirs").send(body).expect(200);

      expect(choir.name).toBe(body.name);
      expect(choir.location).toBe(body.location);
      expect(choir.description).toBe(body.description);
      expect(choir.leader).toBe(body.leader);
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const body = {
        name: "Test Choir",
        description: "We are a choir testing our voices",
        leader: "fake-user",
      };
      const {
        body: { msg },
      } = await request(app).post("/api/choirs").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid body data type", async () => {
      const body = {
        name: "Test Choir",
        location: 4,
        description: "We are a choir testing our voices",
        leader: "fake-user",
      };
      const {
        body: { msg },
      } = await request(app).post("/api/choirs").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/choirs/:choir_id", () => {
  describe("GET", () => {
    test("status:200 responds with an single choir", async () => {
      const choir_id = "61b0c478a1a352f4350523c6";
      const {
        body: { choir },
      } = await request(app).get(`/api/choirs/${choir_id}`).expect(200);

      expect(choir._id).toBe(choir_id);
    });
    test("status 404 responds with a message", async () => {
      const choir_id = "not-valid-id";
      const {
        body: { msg },
      } = await request(app).get(`/api/choirs/${choir_id}`).expect(404);

      expect(msg).toBe("Choir not found");
    });
  });
  describe("DELETE", () => {
    test.skip("status:200 responds with a message", async () => {
      const choir_id = "61b0efa3447feff5f7b3d183";
      const {
        body: { msg },
      } = await request(app).delete(`/api/choirs/${choir_id}`).expect(200);

      expect(msg).toBe("Choir removed");
    });
    test("status:404 responds with a message for invalid id", async () => {
      const choir_id = "not-valid";
      const {
        body: { msg },
      } = await request(app).delete(`/api/choirs/${choir_id}`).expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
  });
});

describe("/api/notifications/:username/", () => {
  describe.only("GET", () => {
    test("status:200 responds with an array of notifications", async () => {
      const username = "cakevealbladerunner";
      const {
        body: { notifications },
      } = await request(app).get(`/api/notifications/${username}/`).expect(200);

      const notificationTest = {
        _id: expect.any(String),
        username: expect.any(String),
        type: expect.any(String),
        date: expect.any(String),
        author: expect.any(String),
        read: expect.any(Boolean),
      };

      expect(notifications.length).toBe(1);

      notifications.forEach((notification) => {
        expect(notification.username).toBe(username);
        expect(notification).toMatchObject(notificationTest);
      });
    });
  });
  test.only("status:404 responds with a message for invalid username", async () => {
    const username = "not a user";
    const {
      body: { msg },
    } = await request(app).get(`/api/notifications/${username}/`).expect(404);

    expect(msg).toBe("User not found");
  });
});

describe("/api/events", () => {
  describe("GET", () => {
    test.only("status:200 responds with an array of events", async () => {
      const {
        body: { events },
      } = await request(app).get("/api/events").expect(200);
      expect(events.length).toBe(3);

      const eventTest = {
        title: expect.any(String),
        choir: expect.any(String),
        type: expect.any(String),
        date: expect.any(String),
        location: expect.any(String),
        duration: expect.any(Number),
        details: expect.any(String),
      };

      events.forEach((event) => {
        expect(event).toMatchObject(eventTest);
      });
    });
  });
});
