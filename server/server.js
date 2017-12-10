
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');


const app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use('/user', userRouter);



app.listen(3005, () => console.log('Example app listening on port 3005!'))