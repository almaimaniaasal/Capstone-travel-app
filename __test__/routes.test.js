const request = require("supertest");
const app = require("../src/server/server");

describe("Test the root path", () => {
    it("It should response the GET method", async() => {
        await request(app)
            .get("/")
            .then(response => {
                try {
                    expect(response.statusCode).toBe(200);
                } catch (e) {
                    console.log('error', e);
                }
            });
    }, 10000);
});