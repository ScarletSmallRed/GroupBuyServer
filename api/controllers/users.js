const mongoose = require('mongoose')
const User = require('./../models/user')
const Bill = require('./../models/bill')

exports.users_login = function (req,res,next) {
    var param = {
        "userName":req.body.userName,
        "userPwd": req.body.userPwd
    }
    User.findOne(param, function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            });
        }else{
            if(doc){
                res.cookie("userId",doc.userId,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie("userName",doc.userName,{
                    path:'/',
                    maxAge:1000*60*60
                });
                //req.session.user = doc;
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        userName:doc.userName
                    }
                });
            } else {
                res.json({
                    status: '1',
                    msg: 'Wrong information'
                })
            }
        }
    });
}

exports.users_logout = function (req,res,next) {
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1
    });
    res.json({
        status: "0",
        msg: '',
        result: ''
    })
}

exports.users_check_login = function (req,res,next) {
    if(req.cookies.userId){
        res.json({
            status:'0',
            msg:'',
            result:req.cookies.userName || ''
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        });
    }
}

exports.users_cart_list = function (req, res, next) {
    let userId = req.cookies.userId
    User.findOne({userId: userId}).populate('cartList.goodsInfo').then((userDoc, err) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (userDoc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: userDoc.cartList
                })
            }
        }
    })
}

exports.users_cart_edit = function (req,res,next) {
    var userId = req.cookies.userId,
        goodsId = req.body.goodsId,
        goodsNum = req.body.goodsNum,
        goodsChecked = req.body.goodsChecked;


    User.update({userId: userId, 'cartList.goodsInfo': {_id: goodsId}}, {
            'cartList.$.goodsNum': goodsNum,
            'cartList.$.goodsChecked': goodsChecked
        }, function (err, doc) {

            if(err){
                res.json({
                    status:'1',
                    msg:err.message,
                    result:''
                });
            }else{
                res.json({
                    status:'0',
                    msg:'',
                    result:'suc'
                });
            }
        })
}

exports.users_cart_del = function (req,res,next) {
    var userId = req.cookies.userId
    let goodsId = req.body.goodsId
    User.update({
        "userId":userId
    },{
        $pull:{
            cartList:{
                goodsInfo: goodsId
            }
        }
    }, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    });
}

exports.users_info_list = function (req,res,next) {
    var userId = req.cookies.userId;
    User.findOne({userId: userId})
        .populate({
            path:'userBills.billInfo',
            populate: {
                path: 'goodsList.goodsInfo'
            }
        })
        .then(function (doc, err) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result: doc
            });
        }

    })
}

exports.users_address_del = function (req,res,next) {
    var userId = req.cookies.userId,addressId = req.body.addressId;
    User.update({
        userId:userId
    },{
        $pull:{
            'addressList':{
                '_id':addressId
            }
        }
    }, function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:''
            });
        }
    });
}


exports.users_order_add_to_bills = function (req, res, next) {
    let userId = req.cookies.userId,
        bill = req.body.bill

    Bill.create(bill).then((doc, err) => {
        if(err){
            res.json({
                status:'1',
                msg:err3.message,
                result:''
            });
        } else {
            res.json({
                status: '0',
                msg: 'Creating bill successfully!',
                result: doc._id
            })
        }
    })
}

exports.users_order_add_to_users = function (req, res, next) {
    let userId = req.cookies.userId
    let billId = req.body.billId

    User.update({userId: userId}, {
        $push: {
            userBills: {
                billInfo: billId
            }
        }
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
            })
        } else {
            res.json({
                status: '0',
                msg: 'suc',
                result: ''
            })
        }
    })
}

exports.users_edit_user_info = function (req, res, next) {
    let userId = req.cookies.userId
    let userInfo = req.body

    console.log('###########')
    console.log(userInfo)

    User.update({userId: userId}, userInfo, function (err, doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    })
}