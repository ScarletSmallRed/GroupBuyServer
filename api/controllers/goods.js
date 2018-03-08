const mongoose = require('mongoose');
const Good = require('../models/good');
const User = require('../models/user')

exports.goods_get_all = (req, res, next) => {
  Good.find()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.goods_search_good = (req, res, next) => {
  const keyWord = req.params.keyWord;
  Good.find({ goodsName: { $regex: keyWord } })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.goods_get_good = (req, res, next) => {
  const _id = req.params.goodId;
  Good.findById({ _id: _id })
    .then(doc => {
      res.send(doc);
      console.log(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.goods_create_good = (req, res, next) => {
  Good.find({ goodsName: req.body.goodsName })
    .then(doc => {
      if (doc.length !== 0) {
        res.json({
          status: 1,
          massage: '该产品已存在'
        });
      } else {
        const good = new Good({
          goodsName: req.body.goodsName,
          goodsSize: req.body.goodsSize,
          goodsPrice: req.body.goodsPrice,
          goodsImage: req.file.path,
          goodsCategory:req.body.goodsCategory
        });
        good
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

exports.goods_updateimg_good = (req, res, next) => {
  const _id = req.params.goodId;
  const good = {
    goodsImage: req.file.path
  };
  //读取图片名称
  let delPath = null;
  Good.findOne({ _id }, (err, goodDoc) => {
    if (err) {
      res.json({
        status: '1',
        message: '读取产品图片失败',
        result: ''
      });
    } else {
      delPath = goodDoc.goodsImage;
    }
  });
  Good.updateMany({ _id: _id }, good)
    .then(doc => {
      console.log(doc);
      if (doc.n !== 0) {
        let fs = require('fs');
        fs.unlink(delPath, err => {
          if (err) console.log(err);
          console.log('图片文件删除成功' + delPath);
        });
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

exports.goods_update_good = (req, res, next) => {
  const _id = req.params.goodId;
  const good = {
    goodsName: req.body.goodsName,
    goodsSize: req.body.goodsSize,
    goodsCategory: req.body.goodsCategory,
    goodsPrice: req.body.goodsPrice
  };
  Good.updateMany({ _id: _id }, good)
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

exports.goods_delete_good = (req, res, next) => {
  let delPath = null;

  Good.findOne({ _id: req.params.goodId }, (err, goodDoc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      delPath = goodDoc.goodsImage;
    }
  });

  Good.remove({ _id: req.params.goodId })
    .then(doc => {
      console.log(doc);
      if (doc.n === 1) {
        let fs = require('fs');
        fs.unlink(delPath, err => {
          if (err) console.log('删除图片错误' + err);
          console.log('图片文件删除成功' + delPath);
        });
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
};

exports.goods_get_conditional_list = function (req, res, next) {
    let category = req.param('category')
    let params = {}
    let isPriceUp = req.param('isPriceUp')
    let search = req.param('search')


    if (search != '') {
        params = {
            goodsName: search
        }
    } else {
        if (category != '全部') {
            params = {
                goodsCategory: category
            }
        } else {
            params = {}
        }
    }

    Good.find(params).sort({'goodsPrice': isPriceUp}).exec(
        function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                })
            } else {
                res.send(doc)
            }
        })
}

exports.goods_add_cart = function (req, res, next) {
    let userId = req.cookies.userId
    let goodsName = req.body.goodsName

    console.log('############## ADD CART')

    User.findOne({userId: userId}).populate('cartList.goodsInfo').then((userDoc, err) => {

        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if(userDoc){
                var goodsItem = ''
                userDoc.cartList.forEach(function (item) {
                    if(item.goodsInfo.goodsName === goodsName){
                        goodsItem = item;
                        item.goodsNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function (err2,doc2) {
                        if(err2){
                            res.json({
                                status:"1",
                                msg:err2.message
                            })
                        }else{
                            res.json({
                                status:'0',
                                msg:'',
                                result:'suc'
                            })
                        }
                    })
                }else{
                    Good.findOne({goodsName: goodsName}, function (err1,doc) {
                        if(err1){
                            res.json({
                                status:"1",
                                msg:err1.message
                            })
                        }else{
                            if(doc){
                                let goodItem = {
                                    goodsInfo: doc._id,
                                    goodsNum: 1
                                }
                                userDoc.cartList.push(goodItem);
                                userDoc.save(function (err2,doc2) {
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:err2.message
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'',
                                            result:'suc'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }
    })
}