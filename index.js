const express = require('express');
const app = express();
const dotenv = require('dotenv');
const Router = require('./routes/routers.js');
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config({
    path: "./.env",
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
  app.use('/api', Router);
  app.use(cors({
    origin: 'http://your-frontend-domain.com',
  }));

app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world! I am manish mehta<h1>');
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})