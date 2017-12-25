

const express = require('express');
const Router = express.Router();
const utils = require('utility');
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};

Router.get('/list', (req, res) => {
  // User.remove({}, (e, d) => {});  
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({code: 0, data: doc});
  }); 
});

Router.post('/update', (req, res) => {
   const userid = req.cookies.userid;
   if (!userid) {
     return res.dumps({code: 1});
   }
   const body = req.body;
   // In mongoose 4, update() and findOneAndUpdate()
   // only check the top-level schema's strict mode setting.
  const opts = { strict: false }; 
  User.findByIdAndUpdate(userid, body, opts, (err, doc) => {
     (async () => {
       const data = Object.assign({}, {
         user: doc.user,
         type: doc.type,
       }, body);
       return data;
     })().then(data => {
       return res.json({ code: 0, data});
     });
   })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd), }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'});
    } 
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc});
  })
});
Router.post('/register', (req, res) => {
  console.log(res.body);
  const {user, pwd, type} = req.body;
  User.findOne({user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'});
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '服务端错误' });
      }
      const {user, type, _id} = d;
      res.cookie('userid', _id);
      return res.json({code: 0, data: {user, type, _id}});
    })
  })
});

function md5Pwd(pwd) {
  const salt = 'Hayden_is_good_!541xyz';
  return utils.md5(utils.md5(pwd + salt));
}

Router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '服务端错误'});
    }
    return res.json({code: 0, data: doc});  
  })
})

module.exports = Router;