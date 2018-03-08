const mongoose = require('mongoose');
const Area = require('../models/area');

exports.areas_get_all = (req, res, next) => {
    Area.find()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};


exports.areas_get_area = (req, res, next) => {
    const _id = req.params.areaId;
    Area.findById({ _id: _id })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.areas_create_area = (req, res, next) => {
  Area.find({ areaName: req.body.areaName })
    .then(doc => {
      if (doc.length !== 0) {
        res.json({
          status: 1,
          massage: '该产品已存在'
        });
      } else {
        const area = new Area({
            areaName: req.body.areaName,
            areaTime: req.body.areaTime,
            areaDescription: req.body.areaDescription,
        });
        area
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
    })
    .catch(err => {
      console.log(err);
    });
};

exports.areas_update_area = (req, res, next) => {
  const _id = req.params.areaId;
  const area = {
    areaName: req.body.areaName,
    areaTime: req.body.areaTime,
    areaDescription: req.body.areaDescription
  };
  console.log('#################')
  console.log(area)
  Area.updateMany({ _id: _id }, area)
    .then(doc => {
      console.log(doc);
      if (doc.n !== 0) {
        res.json({
          status: 0,
          message: '产品数据更新成功'
        });
      } else {
        console.log('产品不存在');
        res.json({
          status: 1,
          message: '产品不存在'
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.areas_delete_area = (req, res, next) => {
    Area.findOne({ _id: req.params.areaId }, (err, areaDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
        Area.remove({ _id: req.params.areaId })
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
