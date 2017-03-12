module.exports = {
    resHandler: function(res, data = null) {
        return res.send({
            "code":200,
            "enmsg":"ok",
            "cnmsg":"成功",
            "data": data
        });
    },
    errHandler: function(res, err, code = 500, enmsg = "server error", cnmsg = "服务器错误") {
        // console.log(err);
        return res.send({
            "code":code,
            "enmsg":enmsg,
            "cnmsg":cnmsg,
            "data": null
        })
    }
}