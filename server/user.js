

const express = require('express');
const Router = express.Router();
const utils = require('utility');
const model = require('./model');
const User = model.getModel('user');


Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post('/register', (req, res) => {
  console.log(res.body);
  const {user, pwd, type} = req.body;
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    }
    User.create({ user, pwd: md5Pwd(pwd), type}, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '服务端错误'});
      }
      return res.json({code: 0})
    })
  })
});

function md5Pwd(pwd) {
  const salt = 'Hayden_is_good_!541xyz';
  return utils.md5(utils.md5(pwd + salt));
}

Router.get('/info', (req, res) => {
  return res.json({code: 0});
})

module.exports = Router;