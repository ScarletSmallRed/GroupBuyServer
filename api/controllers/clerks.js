const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Clerk = require('../models/clerk');

exports.clerks_get_all = (req, res, next) => {
  Clerk.find({ isAdmin: false })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.clerks_search_clerk = (req, res, next) => {
  const keyWord = req.params.keyWord;
  Clerk.find({ email: { $regex: keyWord } })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.clerks_get_clerk = (req, res, next) => {
  const _id = req.params.clerkId;
  Clerk.findById({ _id: _id })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.clerks_create_clerk = (req, res, next) => {
  Clerk.find({ email: req.body.email })
    .then(doc => {
      if (doc.length !== 0) {
        res.json({
          status: 1,
          massage: '邮箱账号已存在'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const clerk = new Clerk({
              email: req.body.email,
              password: hash,
              role: req.body.role,
              name: req.body.name,
              isAdmin: req.body.isAdmin
            });
            clerk
              .save()
              .then(doc => {
                console.log(doc);
                res.send(doc);
              })
              .catch(err => {
                console.log(err);
                res.json({
                  status: 2,
                  error: err
                });
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.clerks_login_clerk = (req, res, next) => {
  Clerk.find({ email: req.body.email })
    .then(doc => {
      if (doc.length < 1) {
        return res.json({
          status: 1,
          message: '此账号不存在，登录失败！'
        });
      }
      bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
        if (err) {
          return res.json({
            status: 2,
            message: '密码错误，登录失败'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: doc[0].email,
              clerkId: doc[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '3h'
            }
          );
          return res.json({
            status: 0,
            message: '登录成功',
            token: token,
            email: doc[0].email,
            role: doc[0].role,
            _id: doc[0]._id
          });
        }

        res.json({
          status: 2,
          message: '密码错误，登录失败'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clerks_delete_clerk = (req, res, next) => {
  Clerk.remove({ _id: req.params.clerkId })
    .then(doc => {
      console.log(doc);
      if (doc.n === 1) {
        res.status(200).json({
          message: '删除职工成功'
        });
      } else {
        res.status(404).json({
          message: '用户名不存在'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clerks_update_clerk = (req, res, next) => {
  const _id = req.params.clerkId;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const clerk = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
        role: req.body.role
      };
      Clerk.updateMany({ _id: _id }, clerk)
        .then(doc => {
          console.log(doc);
          if (doc.n !== 0) {
            res.json({
              status: 0,
              message: '职工数据更新成功'
            });
          } else {
            console.log('用户不存在');
            res.json({
              status: 1,
              message: '用户不存在'
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
};
