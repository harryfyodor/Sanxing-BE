let Tag = require('../lib/mongo').Tag;

// 来自知乎的乱序操作
function shuffle(input) {
    for(var i = input.length - 1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemIndex;
    }
    return input;
}

module.exports = {
  // 获取全部标签
  getAllTags: function() {
    return Tag.find().select("name");
  },

  // 把用户的标签全部传进来，返回一个推荐文章链接
  getUrlsByTag: async function(tags) {
    if(tags.length === 0) return null;
    let arr = shuffle(tags),
        tag = arr.shift(),
        tagModel = await Tag.findOne({name: tag});
    
    let articles = shuffle(tagModel.articles);

    if(articles.length === 0) return null;
    return articles.shift();
  }
}