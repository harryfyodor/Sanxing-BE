let path = require('path');
let express = require('express');
// var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
let winston = require('winston');
let expressWinston = require('express-winston');
let config = require('./config');
let app = express();
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(session({
  store: new RedisStore(config.redisOptions),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret: 'Hello My Redis.',
  resave: false,
  saveUninitialized: true
}));

// babel 转义
require("babel-core/register");
let routes = require('./routes'); 
// app.use(express.static(path.join(__dirname,'public')))

// if(process.env.NODE_ENV === 'production') {
    // 正常请求的日志
    // app.use(expressWinston.logger({
    //   transports: [
    //     new (winston.transports.Console)({
    //       json: true,
    //       colorize: true
    //     }),
    //     new winston.transports.File({
    //       filename: 'logs/success.log'
    //     })
    //   ]
    // }));

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
// }

// 路由
routes(app);

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`Server is listening on port ${config.port}`);
  });
}