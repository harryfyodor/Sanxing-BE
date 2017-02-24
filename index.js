let path = require('path');
let express = require('express');
// var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
let winston = require('winston');
let expressWinston = require('express-winston');
let config = require('./config');
let app = express();
// 转义
require("babel-core/register");
let routes = require('./routes'); 
// app.use(express.static(path.join(__dirname,'public')))

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

// 路由
routes(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`Server is listening on port ${config.port}`);
  });
}