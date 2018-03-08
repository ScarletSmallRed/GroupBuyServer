var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId:String,
    userName:String,
    userPwd:String,
    userAddress: String,
    userPhone: String,
    userEmail: String,
    userPostCode: String,
    cartList:[
        {
            goodsInfo:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'goods',
                require: true
            },
            goodsNum: {
                type: Number,
                require: true
            },
            goodsChecked: {
                type: String,
                require: true,
                default: '1'
            }
        }
    ],
    userBills: [
        {
            billInfo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bill'
            }
        }
    ]
});

module.exports = mongoose.model("User",userSchema);
