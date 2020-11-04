const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(logger);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log(`${req.method} to ${req.url} at ${dateTime}`);
  next();
};

module.exports = server;
