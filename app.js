const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// 连接MongoDB by using mongoose
mongoose.connect('mongodb://192.168.1.38/ProjectRich');
mongoose.Promise = global.Promise;

// 创建Routes实例
const clerkRoutes = require('./api/routes/clerks');
const goodRoutes = require('./api/routes/goods');
const recordingRoutes = require('./api/routes/recordings');
const billRoutes = require('./api/routes/bills');
const categoriesRoutes = require('./api/routes/categories');
const billNumberRoutes = require('./api/routes/billNumbers');
const areaRoutes = require('./api/routes/areas');
const userRoutes = require('./api/routes/users')

// **************************一系列的middleware************************

// 打印请求状态
app.use(morgan('dev'));
//使图片文件夹能被访问
app.use('/uploads', express.static('uploads'));

// Parsing the Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// 客户端登录拦截
app.use(function (req,res,next) {
    if(req.cookies.userId){
        next();
    }else{
        console.log("url:"+req.originalUrl);
        if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.originalUrl.indexOf('/goods/list')>-1 || req.originalUrl.indexOf('/categories')>-1 || req.originalUrl.indexOf('/uploads')>-1 ){
            next();
        }else{
            res.json({
                status:'1',
                msg:'当前未登录!!!!!',
                result:''
            });
        }
    }
});

// Handling CORS 跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// *******************************************************************

// 使用Routes实例
app.use('/clerks', clerkRoutes);
app.use('/goods', goodRoutes);
app.use('/recordings', recordingRoutes);
app.use('/bills', billRoutes);
app.use('/categories', categoriesRoutes);
app.use('/billNumbers', billNumberRoutes);
app.use('/areas', areaRoutes);
app.use('/users', userRoutes)

// handling error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
