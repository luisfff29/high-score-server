const http = require("http");
const jsonBody = require("body/json");
var scores = [
    { name: "Edwin", score: 50 },
    { name: "David", score: 39 },
];

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(
                "Welcome to High Score Server, go to /scores and play around with GET and POST requests. "
            );
        } else if (req.url === "/scores") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(scores));
        } else {
            res.statusCode = 404;
            res.end("ERROR NOT FOUND");
        }
    } else if (req.method === "POST") {
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        jsonBody(req, res, (err, requestBody) => {
            scores.push(requestBody);
            res.end(JSON.stringify(requestBody));
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
