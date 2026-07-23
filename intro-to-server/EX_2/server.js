const http = require("http");

const PORT = 3000;

const users = [];

const server = http.createServer(async (req, res) => {
  console.log("server called");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  if (req.url.startsWith("/users")) {
    const parts = req.url.split("/");
    if (req.method === "GET" && parts.length === 2) {
      res.write(JSON.stringify(users));
    } else if (req.method === "GET" && parts.length === 3) {
      const id = Number(parts[2]);
      const user = users.find((u) => u.id === id);
      if (user) {
        res.write(JSON.stringify(user));
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "User not found" }));
      }
    } else if (req.method === "POST") {
      const body = await readBody(req);
      console.log(body);
      if (body) {
        let data;
        try {
          data = JSON.parse(body);
        } catch (err) {
          res.statusCode = 400;
          res.write(
            JSON.stringify({
              errorCode: 400,
              message: "Invalid JSON format",
              details: err.message,
            }),
          );
          res.end();
          return;
        }
        data.id = users.length + 1;
        users.push(data);
        console.log(users);
        res.code = 201;
        res.write(JSON.stringify(body));
      } else {
        res.status = 400;
        res.write(
          JSON.stringify({
            errorCode: 392,
            message: "body must include content property",
          }),
        );
      }
    } else {
      res.statusCode = 405;
    }
  } else {
    res.statusCode = 404;
    res.write("Page not found");
  }
  res.end();
});

server.listen(PORT, () => {
  console.log("Server is listening...");
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(body);
      });
      req.on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}
