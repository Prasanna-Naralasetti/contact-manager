// const User = require("../models/register")
// const { authenticateUser}=require('../middelewares/authenticateUser')

// module.exports.register = (req, res) => {
//   const body = req.body;
//   const user = new User(body);
//   user
//     .save()
//     .then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       if (err && err.message) {
//         res.status(400).send({ error: err.message });
//       } else {
//         res.status(404).send("not found");
//       }
//     });
// };

// module.exports.login = (req, res) => {
//   const body = req.body;
//   User.findByCredentials(body.email, body.password)
//     .then(user => {
//       return user.generateToken();
//     })
//     .then(token => {
//       res.setHeader('x-auth',token).send(token);
//     })
//     .catch(err => {
//       res.send(err);
//     });
// }

// module.exports.logout = (req, res) => {
//   const { user, token } = req
//   console.log("user", user)
//   User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
//     .then(() => {
//       res.json({ notice: 'successfully logged out' })
//     })
//     .catch((err) => {
//       res.json(err)
//     })
// }

// module.exports.account=(req,res)=>{
//    const {user}=req
//    res.send(user)
//    }

const express = require('express')
const { User } = require('../models/register')
const _ = require('lodash')

module.exports.register = (req, res) => {
  const body = req.body
  const user = new User(body)
  user.save()
    .then((user) => {
      res.json(_.pick(user, ['_id', 'username', 'email']))
    })
    .catch((err) => {
      res.json(err)
    })
}

module.exports.login = (req, res) => {
  const body = req.body
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateToken()
    })
    .then((token) => {
      res.setHeader('x-auth', token).json()
    })
    .catch((err) => {
      res.json(err)
    })

}

module.exports.logout = (req, res) => {
  const { user, token } = req
  console.log("user", user)
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.json({ notice: 'successfully logged out' })
    })
    .catch((err) => {
      res.json(err)
    })
}
