let http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.json());

// file send
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// validation of object null or blank
app.post("/create-user", (req, res) => {
  let body = req.body;
  try {
    if (!req.body || Object.keys(req.body).length == 0) {
      return res.status(500).json({
        message: "Please provide all the required fields",
      });
    }
    for (const key in body) {
      if (body[key] === "" || body[key] === null || body[key] === undefined) {
        return res
          .status(500)
          .send(
            `Internal Server Error: Key '${key}' cannot be blank, null, or undefined`
          );
      }
    }
    return res.status(201).json({
      message: "User Created",
      user: body,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getUser", (req, res) => {
  res.status(200).json({
    message: "User Found",
    user:{
      name:'bhargav'
    }
  });
});
// creating server
http.createServer(app).listen(3001, () => {
  console.log("Server is running on port 3001");
});
