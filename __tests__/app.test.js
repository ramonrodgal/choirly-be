const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

afterAll(() => mongoose.connection.close());

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
    test("status:400 responds with a message for username that already exists in the database", async () => {
      const body = {
        email: "ramon@email.com",
        username: "korus76",
        first_name: "ramon",
        last_name: "rodriguez",
        phone_number: 8989898989,
      };
      const {
        body: { msg },
      } = await request(app).post("/api/users").send(body).expect(400);

      expect(msg).toBe("Bad Request. Username already exists");
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
  describe("PATCH", () => {
    test("status:200 responds with the update user", async () => {
      const username = "genie";
      const body = {
        username: "user",
        avatar_url: "http://url.com",
        about_me: "This is all about me",
        first_name: "name",
        last_name: "surname",
        phone_number: 42069,
      };
      const {
        body: { user },
      } = await request(app)
        .patch(`/api/users/${username}`)
        .send(body)
        .expect(200);

      for (let key in body) {
        expect(user[key]).toBe(body[key]);
      }
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

describe("/api/choirs/:choir_id/users/:username", () => {
  describe("DELETE", () => {
    test("status:200 responds with the choir with user deleted from member", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "genie";

      const {
        body: { choir },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/users/${username}`)
        .expect(200);

      expect(choir.members.includes(username)).toBe(false);
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "notValid";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/users/${username}`)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:404 responds with a message for choir not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a248";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/users/${username}`)
        .expect(404);

      expect(msg).toBe("Choir not found");
    });
    test("status:404 responds with a message for user not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "notAUser";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/users/${username}`)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:400 responds with a message when the user is not a member", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/users/${username}`)
        .expect(400);

      expect(msg).toBe("Bad request. The user is not a member of this choir");
    });
  });
  describe("PATCH", () => {
    test("status:200 responds with the choir with a member added", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "genie";

      const {
        body: { choir },
      } = await request(app)
        .patch(`/api/choirs/${choir_id}/users/${username}`)
        .expect(200);

      expect(choir.members.includes(username)).toBe(true);
    });
    test("status:404 responds with a message for user not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "notAUser";

      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/choirs/${choir_id}/users/${username}`)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:404 responds with a message for choir not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a248";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/choirs/${choir_id}/users/${username}`)
        .expect(404);

      expect(msg).toBe("Choir not found");
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "invalid";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/choirs/${choir_id}/users/${username}`)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:400 responds with a message when the user is already a member", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const username = "genie";

      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/choirs/${choir_id}/users/${username}`)
        .expect(400);

      expect(msg).toBe("This user is already a member");
    });
  });
});

describe("/api/choirs/:choirs_id/files", () => {
  describe("POST", () => {
    test("status:200 responds with a choir with an added file", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        filename: "song.mp3",
        type: "song",
        path: "http://google.com",
      };

      const {
        body: { choir },
      } = await await request(app)
        .post(`/api/choirs/${choir_id}/files`)
        .send(body)
        .expect(200);

      const lastFile = choir.files[choir.files.length - 1];

      expect(lastFile.filename).toBe(body.filename);
      expect(lastFile.type).toBe(body.type);
      expect(lastFile.path).toBe(body.path);
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "61b0c4c0650";
      const body = {
        filename: "song.mp3",
        type: "song",
        path: "http://google.com",
      };

      const {
        body: { msg },
      } = await await request(app)
        .post(`/api/choirs/${choir_id}/files`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:400 responds with a message for invalid fields in body", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        filename: "song.mp3",
        notValid: "song",
        path: "http://google.com",
      };

      const {
        body: { msg },
      } = await await request(app)
        .post(`/api/choirs/${choir_id}/files`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid fields in body", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        filename: "song.mp3",
        type: 12345,
        path: "http://google.com",
      };

      const {
        body: { msg },
      } = await await request(app)
        .post(`/api/choirs/${choir_id}/files`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid url in body", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        filename: "song.mp3",
        type: "song",
        path: "not valid url",
      };

      const {
        body: { msg },
      } = await await request(app)
        .post(`/api/choirs/${choir_id}/files`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Resquest. Invalid path URL");
    });
  });
  describe.skip("DELETE", () => {
    test("status:200 responds with a choir with a file removed", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const file_id = "61b4e4a374b1b7ae06ba8520";

      const {
        body: { choir },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/files/${file_id}`)
        .expect(200);

      expect(choir.files.length).toBe(2);
    });
    test("status:404 responds with a message for file not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const file_id = "61b4e4a374b1b7ae06ba8520";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/files/${file_id}`)
        .expect(404);

      expect(msg).toBe("File not found");
    });
    test("status:400 responds with a message for invalid file id", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const file_id = "61b4e4a374b1b";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/files/${file_id}`)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid file id");
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "61b0c4c065064";
      const file_id = "61b4e4a374b1b7ae06ba8520";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/files/${file_id}`)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:404 responds with a message for choir not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a248";
      const file_id = "61b4e4a374b1b7ae06ba8520";

      const {
        body: { msg },
      } = await request(app)
        .delete(`/api/choirs/${choir_id}/files/${file_id}`)
        .expect(404);

      expect(msg).toBe("Choir not found");
    });
  });
});

describe("/api/notifications/user/:username/", () => {
  describe("GET", () => {
    test("status:200 responds with an array of notifications", async () => {
      const username = "cakevealbladerunner";
      const {
        body: { notifications },
      } = await request(app)
        .get(`/api/notifications/user/${username}/`)
        .expect(200);

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
    test("status:404 responds with a message for invalid username", async () => {
      const username = "not a user";
      const {
        body: { msg },
      } = await request(app)
        .get(`/api/notifications/user/${username}/`)
        .expect(404);

      expect(msg).toBe("User not found");
    });
  });
  describe("POST", () => {
    test("status:201 responds with the posted notification", async () => {
      const username = "cakevealbladerunner";
      const body = {
        username: "cakevealbladerunner",
        type: "message",
        choir: "Chester Bach Singers",
        author: "genie",
      };

      const {
        body: { notification },
      } = await request(app)
        .post(`/api/notifications/user/${username}`)
        .send(body)
        .expect(201);

      const notificationTest = {
        username: expect.any(String),
        type: expect.any(String),
        choir: expect.any(String),
        author: expect.any(String),
        date: expect.any(String),
        read: expect.any(Boolean),
      };

      expect(notification.username).toBe(username);
      expect(notification.read).toBe(false);
      expect(notification).toMatchObject(notificationTest);
    });
    test("status:404 responds with a message for invalid username", async () => {
      const username = "not-valid-username";
      const body = {
        username: "cakevealbladerunner",
        type: "message",
        choir: "Chester Bach Singers",
        author: "genie",
      };
      const {
        body: { msg },
      } = await request(app)
        .get(`/api/notifications/user/${username}`)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const username = "cakevealbladerunner";
      const body = {
        notvalid: "cakevealbladerunner",
        type: "message",
        choir: "Chester Bach Singers",
        author: "genie",
      };
      const {
        body: { msg },
      } = await request(app).post(`/api/notifications/user/${username}`);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid data type in body", async () => {
      const username = "cakevealbladerunner";
      const body = {
        username: 12345,
        type: "message",
        choir: "Chester Bach Singers",
        author: "genie",
      };
      const {
        body: { msg },
      } = await request(app).post(`/api/notifications/user/${username}`);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/notifications/:notification_id", () => {
  describe("PATCH", () => {
    test("status:200 responds with the updated notification", async () => {
      const notification_id = "61b0c4c065064fdfb889a160";
      const body = {
        accepted: true,
        read: true,
      };
      const {
        body: { notification },
      } = await request(app)
        .patch(`/api/notifications/${notification_id}`)
        .send(body)
        .expect(200);

      expect(notification.accepted).toBe(body.accepted);
      expect(notification.read).toBe(body.read);
    });
    test("status:400 responds with a message for invalid notification id", async () => {
      const notification_id = "notValidId";
      const body = {
        accepted: true,
        read: true,
      };
      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/notifications/${notification_id}`)
        .send(body)
        .expect(400);
      expect(msg).toBe("Bad request. Invalid notification id");
    });
    test("status:404 responds with a message for notification not found", async () => {
      const notification_id = "61b0c4c065064fdfb889a161";
      const body = {
        accepted: true,
        read: true,
      };
      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/notifications/${notification_id}`)
        .send(body)
        .expect(404);
      expect(msg).toBe("Notification not found");
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const notification_id = "61b0c4c065064fdfb889a160";
      const body = {
        notvalid: true,
        accepted: true,
        read: true,
      };
      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/notifications/${notification_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const notification_id = "61b0c4c065064fdfb889a160";
      const body = {
        accepted: 123,
        read: true,
      };
      const {
        body: { msg },
      } = await request(app)
        .patch(`/api/notifications/${notification_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/events", () => {
  describe("GET", () => {
    test("status:200 responds with an array of events", async () => {
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

describe("/api/events/:event_id/", () => {
  describe("GET", () => {
    test("status:200 responds a single event", async () => {
      const event_id = "61b0c4c065064fdfb889a156";
      const {
        body: { events },
      } = await request(app).get(`/api/events/${event_id}`).expect(200);
      expect(events.length).toBe(1);

      events.forEach((event) => {
        expect(event.choir).toBe("African Children's Choir");
      });
    });
  });
  test("status:400 responds with a message for invalid event id", async () => {
    const event_id = "notvalid";
    const {
      body: { msg },
    } = await request(app).get(`/api/events/${event_id}`).expect(400);

    expect(msg).toBe("Bad request. Invalid event id");
  });
  test.skip("status:404 responds with a message for events not found", async () => {});
});

describe("/api/events/:event_id/users", () => {
  describe("PATCH", () => {
    test("status:200 responds with the event with the added user in going array", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        username: "korus76",
        going: true,
      };
      let {
        body: { event },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(200);

      expect(event.going[event.going.length - 1]).toBe(body.username);
    });
    test("status:200 responds with the event with the added user in not going array", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        username: "korus76",
        going: false,
      };
      let {
        body: { event },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(200);

      expect(event.not_going[event.not_going.length - 1]).toBe(body.username);
    });
    test("status:404 responds with a message for invalid username in body", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        username: "notAUser",
        going: true,
      };
      let {
        body: { msg },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        notValid: "korus76",
        going: true,
      };
      let {
        body: { msg },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for body data type", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        user: "korus76",
        going: "true",
      };
      let {
        body: { msg },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for a user already inside the event", async () => {
      const choir_id = "61b0c4c065064fdfb889a156";
      let body = {
        username: "korus76",
        going: true,
      };
      let {
        body: { msg },
      } = await request(app)
        .patch(`/api/events/${choir_id}/users`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad request. The user is already going to this event");
    });
  });
});

describe("/api/events/choir/:choir_id", () => {
  describe("GET", () => {
    test("status:200 responds with an array of events filtered by choir id", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const {
        body: { events },
      } = await request(app).get(`/api/events/choir/${choir_id}`);

      expect(events.length).toBe(1);
      events.forEach((event) => {
        expect(event.choir).toBe("African Children's Choir");
      });
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "61b0c4c0";
      const {
        body: { msg },
      } = await request(app).get(`/api/events/choir/${choir_id}`);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test.skip("status:404 responds with a message for invalid events not found", async () => {
      const choir_id = "61b0c4c0";
      const {
        body: { msg },
      } = await request(app).get(`/api/events/choir/${choir_id}`);

      expect(msg).toBe("Bad request. Invalid event id");
    });
  });
  describe("POST", () => {
    test("status:201 responds with the posted event", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        title: "Event Title",
        choir: "Chester Bach Singers",
        type: "rehersal",
        location: "location",
        date: Date.now(),
        duration: 1,
        details: "test details",
      };
      const {
        body: { event },
      } = await request(app)
        .post(`/api/events/choir/${choir_id}`)
        .send(body)
        .expect(201);

      expect(event.title).toBe(body.title);
    });
    test("status:400 responds with a message for invalid choid_id", async () => {
      const choir_id = "61b0c4c";
      const body = {
        title: "Event Title",
        choir: "Chester Bach Singers",
        type: "rehersal",
        location: "location",
        date: Date.now(),
        duration: 1,
        details: "test details",
      };
      const {
        body: { msg },
      } = await request(app)
        .post(`/api/events/choir/${choir_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:400 responds with a message for invalid body field", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        title: "Event Title",
        choir: "Chester Bach Singers",
        location: "location",
        date: Date.now(),
        duration: 1,
        details: "test details",
      };
      const {
        body: { msg },
      } = await request(app)
        .post(`/api/events/choir/${choir_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid body data type", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        title: "Event Title",
        choir: "Chester Bach Singers",
        location: "location",
        date: Date.now(),
        duration: "2 hours",
        details: "test details",
      };
      const {
        body: { msg },
      } = await request(app)
        .post(`/api/events/choir/${choir_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for data in type field", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const body = {
        title: "Event Title",
        choir: "Chester Bach Singers",
        type: "no valid",
        location: "location",
        date: "2021-12-25T19:30:00.000Z",
        duration: 1,
        details: "test details",
      };
      const {
        body: { msg },
      } = await request(app)
        .post(`/api/events/choir/${choir_id}`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid event type");
    });
  });
});

describe("/api/messages/choir/:choid_id", () => {
  describe("GET", () => {
    test("status:200 responds with an array of messages from a choir", async () => {
      const choir_id = "61b0c4c065064fdfb889a148";
      const {
        body: { messages },
      } = await request(app).get(`/api/messages/choir/${choir_id}`).expect(200);

      expect(messages.length).toBe(1);

      const messageTest = {
        choir: expect.any(String),
        title: expect.any(String),
        author: expect.any(String),
        created_at: expect.any(String),
        body: expect.any(String),
        likes: expect.any(Number),
        comments: expect.any(Object),
      };

      messages.forEach((message) => {
        expect(message).toMatchObject(messageTest);
      });
    });
    test("status:400 responds with a message for invalid choir id", async () => {
      const choir_id = "61b0c4c0";
      const {
        body: { msg },
      } = await request(app).get(`/api/messages/choir/${choir_id}`).expect(400);

      expect(msg).toBe("Bad request. Invalid choir id");
    });
    test("status:404 responds with a message for invalid choir not found", async () => {
      const choir_id = "61b0c4c065064fdfb889a149";
      const {
        body: { msg },
      } = await request(app).get(`/api/messages/choir/${choir_id}`).expect(404);

      expect(msg).toBe("Choir not found");
    });
  });
});

describe("/api/messages", () => {
  describe("POST", () => {
    test("status:201 responds with the posted message", async () => {
      const body = {
        choir: "African Children's Choir",
        title: "Test message!",
        author: "cakevealbladerunner",
        body: "Test body",
      };
      const {
        body: { message },
      } = await await request(app).post("/api/messages").send(body).expect(201);

      for (let key in body) {
        expect(message[key]).toBe(body[key]);
      }
    });
    test("status:400 responds with a message for invalid body fields", async () => {
      const body = {
        choir: "African Children's Choir",
        author: "cakevealbladerunner",
        body: "Test body",
      };
      const {
        body: { msg },
      } = await request(app).post("/api/messages").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with a message for invalid body data type", async () => {
      const body = {
        choir: "African Children's Choir",
        title: "Test message!",
        author: 123456,
        body: "Test body",
      };
      const {
        body: { msg },
      } = await await request(app).post("/api/messages").send(body).expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/messages/:message_id", () => {
  describe("GET", () => {
    test("status:200 responds with a message", async () => {
      const message_id = "61b2536fec3b6b99b57a3357";
      const {
        body: { message },
      } = await request(app).get(`/api/messages/${message_id}`).expect(200);

      const messageTest = {
        _id: expect.any(String),
        choir: expect.any(String),
        title: expect.any(String),
        author: expect.any(String),
        created_at: expect.any(String),
        body: expect.any(String),
        likes: expect.any(Number),
        comments: expect.any(Object),
      };

      expect(message._id).toBe(message_id);

      expect(message).toMatchObject(messageTest);
    });
    test("status:400 responds with a message for invalid id", async () => {
      const message_id = "61b2536";
      const {
        body: { msg },
      } = await request(app).get(`/api/messages/${message_id}`).expect(400);

      expect(msg).toBe("Bad request. Invalid message id");
    });
    test("status:404 responds with a message for message not found", async () => {
      const message_id = "61b2536fec3b6b99b57a3358";
      const {
        body: { msg },
      } = await request(app).get(`/api/messages/${message_id}`).expect(404);

      expect(msg).toBe("Message not found");
    });
  });
  describe("DELETE", () => {
    test.skip("status:200 respond with the deleted message", async () => {
      const message_id = "61b253d59badabd3b3764b56";

      const { body } = await request(app)
        .delete(`/api/messages/${message_id}`)
        .expect(200);

      expect(body.message).toBe("Message deleted");
    });
    test("status:400 respond with a message for invalid message_id", async () => {
      const message_id = "61b2536";
      const {
        body: { msg },
      } = await request(app).delete(`/api/messages/${message_id}`).expect(400);

      expect(msg).toBe("Bad request. Invalid message id");
    });
    test("status:404 respond with a message for message not found", async () => {
      const message_id = "61b2536fec3b6b99b57a3358";
      const {
        body: { msg },
      } = await request(app).get(`/api/messages/${message_id}`).expect(404);

      expect(msg).toBe("Message not found");
    });
  });
});

describe("/api/messages/:message_id/comments", () => {
  describe("POST", () => {
    test("status:200 responds with the message with the added comment", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const comment = {
        author: "moonglade",
        body: "Thanks for the reminder I will BACS transfer my membership tonight",
      };

      const {
        body: {
          message: { comments },
        },
      } = await request(app)
        .post(`/api/messages/${message_id}/comments`)
        .send(comment)
        .expect(200);

      expect(comments[comments.length - 1].body).toBe(comment.body);
    });
    test("status:404 responds with the message for user not found", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const comment = {
        author: "notAUser",
        body: "Thanks for the reminder I will BACS transfer my membership tonight",
      };

      const {
        body: { msg },
      } = await request(app)
        .post(`/api/messages/${message_id}/comments`)
        .send(comment)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:400 responds with the message for invalid data fields in body", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const comment = {
        notvalid: "notAUser",
        body: "Thanks for the reminder I will BACS transfer my membership tonight",
      };

      const {
        body: { msg },
      } = await request(app)
        .post(`/api/messages/${message_id}/comments`)
        .send(comment)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 responds with the message for invalid data type in body", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const comment = {
        notvalid: 12345,
        body: "Thanks for the reminder I will BACS transfer my membership tonight",
      };

      const {
        body: { msg },
      } = await request(app)
        .post(`/api/messages/${message_id}/comments`)
        .send(comment)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
  });
});

describe("/api/messages/:message_id/likes", () => {
  describe("PATCH", () => {
    test("status:200 respond with the message with the likes updates", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const body = {
        username: "korus76",
      };
      const {
        body: { message },
      } = await await request(app)
        .patch(`/api/messages/${message_id}/likes`)
        .send(body)
        .expect(200);

      expect(message.likedBy[message.likedBy.length - 1]).toBe(body.username);
    });
    test("status:404 respond with a message for username not found", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const body = {
        username: "notAUser",
      };
      const {
        body: { msg },
      } = await await request(app)
        .patch(`/api/messages/${message_id}/likes`)
        .send(body)
        .expect(404);

      expect(msg).toBe("User not found");
    });
    test("status:400 respond with a message for invalid fields in body", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const body = {
        user: "korus76",
      };
      const {
        body: { msg },
      } = await await request(app)
        .patch(`/api/messages/${message_id}/likes`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 respond with a message for invalid dta type in body", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const body = {
        username: 76,
      };
      const {
        body: { msg },
      } = await await request(app)
        .patch(`/api/messages/${message_id}/likes`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. Invalid Body");
    });
    test("status:400 respond with a message when the username already liked the message", async () => {
      const message_id = "61b0c4c065064fdfb889a166";
      const body = {
        username: "korus76",
      };
      const {
        body: { msg },
      } = await await request(app)
        .patch(`/api/messages/${message_id}/likes`)
        .send(body)
        .expect(400);

      expect(msg).toBe("Bad Request. The user already liked this message");
    });
  });
});
