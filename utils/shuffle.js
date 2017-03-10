// 来自知乎的乱序操作
module.exports = function shuffle(input) {
    for(var i = input.length - 1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemIndex;
    }
    return input;
}