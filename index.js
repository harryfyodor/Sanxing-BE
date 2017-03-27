import express from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import config from './config'
import session from 'express-session'
import connect from 'connect-redis'
import bodyParser from 'body-parser'
import routes from './routes'

let RedisStore = connect(session)
let app = express()

app.use(bodyParser.json())
app.use(session({
  store: new RedisStore(config.redisOptions),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret: 'Hello My Redis.',
  resave: false,
  saveUninitialized: true
}))

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
}))
// }

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`Server is listening on port ${config.port}`)
})
