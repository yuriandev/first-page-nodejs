const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello!</title></head>");
    res.write("<body>");
    res.write("<h1>Hello World!!!</h1>");
    res.write("<p>This is my first node.js page!</p>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users</title><head>");
    res.write("<body><ul><li><p>User1</p></li></ul></body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split("=")[1];
      console.log(userName);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
};

exports.handler = requestHandler;
