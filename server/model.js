const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/offers';
mongoose.connect(DB_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('success');
  // we're connected!
});

const models = {
  user: {
    'user': {'type': String, 'require': true},
    'pwd': {'type': String, 'require': true},
    'type': {'type': String, 'require': true},
    'avatar': {'type': String},
    // 个人简介或职位简介
    'desc:': {'type': String},
    'title:': {'type': String},
    // boss 
    'company:': {'type': String},
    'money:': {'type': String},
  },
  chat: {
    'chatid': {'type': String, 'require': true},
    'read': {'type': Boolean, 'default': false},
    'from': {'type': String, 'require': true},
    'to': {'type': String, 'require': true},
    'content': {'type': String, 'default': ''},
    'create_time': {'type': Number, 'default': new Date().getTime()},
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
}