const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const port = 8080;

app.use(function (req, res, next) {
  const { url, path: routePath } = req;
  console.log('Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').');
  next();
});
app.use('/', express.static(path.join(__dirname, '')))

app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
});

app.get('/api/v1/listUsers', function (req, res) {
  fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.delete('/api/v1/deleteUser', function (req, res) {
  fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    delete data["user" + req.query["user"]];
    fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
    });

    console.log(data);
    res.end(JSON.stringify(data));
  });
});
app.post('/api/v1/addUser', function (req, res) {
  fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      data["user" + req.query["user"]] = {
          name: req.query["name"],
          password: req.query["password"],
          profession: req.query["profession"],
          id: req.query["user"]
      }
      fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
          if (err) {
              console.error("error" + err);
              return;
          }
      });

      console.log("d" + data);
      res.end(JSON.stringify(data));
  });


});
//TRY TO FIX
app.get('/api/v1/filterUsers', function(req, res) {
  fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user data.");
      return;
    }

    var userSearch = req.query["user"];
    var filterThis = JSON.parse(data);
    var filtered = filterThis["user" + userSearch];

    if (!filtered) {
      res.status(404).send("User not found.");
      return;
    }

    console.log(filtered);
    res.json(filtered);
  });
});
