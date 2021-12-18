var express = require('express');
const winston = require('winston');
const fs = require('fs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'test-service' },
  transports: [
    new winston.transports.Console({})
  ],
});

var app = express();

const list = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', function(req, res){
  const writeToFile = process.env.WRITE_TO_FILE === "true";
  if (writeToFile) {
    const writableStream = fs.createWriteStream("out.txt");
    writableStream.write(JSON.stringify({
      "name": "hi",
      "arr":  new Array(100000)
    }));
    writableStream.on('error',  (error) => {
        console.log(`An error occured while writing to the file. Error: ${error.message}`);
    });
  } else {
      list.push({
        "name": "hi",
        "arr":  new Array(100000)
      });
      logger.log("info", list);
  }
  res.status(200).send({message: "test"});
});

/**
 * Module dependencies.
 */
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', (err) => console.error(err));
server.on('listening', () => console.log(`listening on ${port}`));

console.log(process.env.WRITE_TO_FILE);
console.log(process.env.NODE_ENV);