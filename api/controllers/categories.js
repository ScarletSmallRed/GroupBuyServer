const mongoose = require('mongoose');
const Category = require('../models/category')

exports.categories_get_all = (req, res, next) => {
  Category.find()
    .then(doc => {
      res.send(doc);

    })
    .catch(err => {
      console.log(err);
    });
};

exports.categories_create = (req, res, next) => {
  console.log(req.body)
    Category.find({ categoriesName: req.body.categoriesName })
      .then(doc => {
        if (doc.length !== 0) {
          res.json({
            status: 1,
            message: '该品类已存在'
          });
        } else {
          const category = new Category({
            categoriesName: req.body.categoriesName
          });
          category
            .save()
            .then(doc => {
              console.log(doc);
              res.json({
                status: 0,
                message: '品类创建成功'
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                status: 2,
                error: err
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.categories_delete_categorie = (req, res, next) => {
    Category.findOne({categoriesName: req.body.delcategories }, (err) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        });
      } else {
        
        Category.remove({ categoriesName: req.body.delcategories })
        .then(doc => {
          console.log(doc);
          if (doc.n === 1) {
            res.status(200).json({
              message: '删除产品成功'
            });
          } else {
            res.status(404).json({
              message: '产品不存在'
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
        
      }
    });
  
   
  };