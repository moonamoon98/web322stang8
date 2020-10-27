const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sendMail = require('./sendMail');
const { confirm } = require('./template');
var fs = require('fs');


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));


app.listen(process.env.PORT || 3000, function () {
  console.log(`listening on ${process.env.PORT || 3000}`)
})

app.get('/home', (req, res) => {
  fs.readFile('./views/home.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
})

app.get('/', (req, res) => {
  fs.readFile('./views/home.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
})

app.get('/dashboard', (req, res) => {
  // res.render('dashboard.html')
  // res.sendFile('./view/dashboard.html');
  fs.readFile('./views/dashboard.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });

})

app.get('/register', (req, res) => {
  fs.readFile('./views/registration.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data && data.length });
    res.write(data);
    res.end();
  });
})

app.get('/login', (req, res) => {
  fs.readFile('./views/login.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
})
//logins
app.post('/loginCheck', (req, res) => {
  var error = {}
  if (!req.body.email || req.body.email === "") {
    error.email = "email Required";
  }
  if (!req.body.password || req.body.password === "") {
    error.password = "Password Required";
  }

  if (Object.keys(error).length > 0) {
    res.render('login.ejs', { error })
  } else {
    if (req.body.email === "test@gmail.com" && req.body.password === "123") {
      fs.readFile('./views/dashboard.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
      });
    } else {
      fs.readFile('./views/login.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
      });
    }
  }
})

app.post('/registerCheck', async (req, res) => {
  var error = {}
  if (!req.body.firstname || req.body.firstname === "") {
    error.firstname = "First name Required";
  }
  if (!req.body.lastname || req.body.lastname === "") {
    error.lastname = "Last name Required";
  }
  if (!req.body.email || req.body.email === "") {
    error.email = "email Required";
  }
  if (!req.body.password || req.body.password === "") {
    error.password = "Password Required";
  }

  if (Object.keys(error).length > 0) {


    res.render('registration.ejs', { error })
  } else {
    sendMail(req.body.email, confirm())
    fs.readFile('./views/dashboard.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
      res.write(data);
      res.end();
    });
  }
})

app.get('/roomlist', (req, res) => {
  fs.readFile('./views/roomlist.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
})