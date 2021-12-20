// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// whoamiAPI
app.get('/api/whoami', (req, res) => {
  let forwardedip = req.headers['x-forwarded-for'];
  let ip = forwardedip ? forwardedip.split(/, /)[0] : req.connection.remoteAddress;
  let forwardedlan = req.headers['accept-language'];
  let lan = forwardedlan ? forwardedlan.split(/,[a-z]{2}-/)[0] : '';
  let software = req.headers['user-agent'];
 // let software = forwardedsoftware ? forwardedsoftware.split(/;/)[0] : '';
  res.json({ipaddress: ip, language: lan, software: software});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
