const { test } = require("node:test");
const assert = require("node:assert");
const app = require("../src/server");

test("Health endpoint should return UP", async () => {

    const server = app.listen(0);

    try {
        const port = server.address().port;

        const response = await fetch(
            `http://localhost:${port}/api/health`
        );

        const data = await response.json();

        assert.strictEqual(response.status, 200);
        assert.strictEqual(data.status, "UP");

    } finally {
        server.close();
    }
});