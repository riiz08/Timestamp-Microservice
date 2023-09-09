// index.js
// where your node app starts

// init project
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

app.get('/api/:date', (req, res) => {
  const dateString = req.params.date;

  let timestamp;
  let utcDate;

  if (/^\d{13}$/.test(dateString)) {
    // Jika tanggal dalam format Unix timestamp dalam milidetik
    timestamp = parseInt(dateString);
    utcDate = new Date(timestamp).toUTCString();
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    // Jika tanggal dalam format "YYYY-MM-DD"
    timestamp = new Date(dateString).getTime();
    utcDate = new Date(dateString).toUTCString();
  } else {
    // Jika tanggal tidak sesuai dengan kedua format di atas
    return res.json({ error: 'Invalid date' });
  }

  res.json({ unix: timestamp, utc: utcDate });
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});