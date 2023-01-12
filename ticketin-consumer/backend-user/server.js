const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const authJwt = require('./middleware/jwt');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.options('*', cors());

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/tmp/uploads', express.static(__dirname + '/tmp/uploads'));
app.use(authJwt());
app.use(errorHandler);

// routers
const api = process.env.API_URL;
const usersRouter = require('./routers/users');
const concertsRouter = require('./routers/concerts');
const ticketsRouter = require('./routers/tickets');
app.use(`${api}/concerts`, concertsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/tickets`, ticketsRouter);

//testig router nanti apus aja
app.get("/api", (req, res) => {
  res.json({ "testings": ["userSatu", "userDua", "UserTiga"] })
})

mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: 'concert-database'
})
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch(() => {
    console.log('Database connection has failed....');
  })

app.listen(5000, () => {
  console.log('server is running on the link http://localhost:5000');
});
