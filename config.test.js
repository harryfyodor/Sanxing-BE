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
  },
  qiniu: {
          QINIUCMSBUCKETNAME: 'sanxing-be',
          QINIUACCESS_KEY: 'yLdN2H223rFwXBgQPWhkUWa7EPk1QmLgjzVUX-LH',
          QINIUSECRET_KEY: 'FqLMN2b1cU54f_w3rR2MfRUoq-yAYX6Rpc764C-9'
        }

}
