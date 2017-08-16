module.exports = {
  port: 3000,
  mongodbOptions: {
    host: 'localhost',
    port: 27017,
    db: 'san'
  },
  redisOptions: {
    host: 'localhost',
    port: 6379,
    ttl: 60 * 60 * 24 * 30
  }
}
