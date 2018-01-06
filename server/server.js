
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const app = express();

// work with express
const server =  require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    io.emit('recvmsg', data);
  });
})

app.use(bodyParser());
app.use(cookieParser());
app.use('/user', userRouter);



server.listen(3005, () => console.log('Example app listening on port 3005!'))