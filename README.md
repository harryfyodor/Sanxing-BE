## 综述
- 实现了大部分可能用到的接口，由于不太确定安卓端需求，如果有错漏欢迎提issue
- 周报方面没有处理，留给其他人写了……
- 具体接口可以查看`test`文件夹下的几个`http`文件，我会找时间在wiki中补充
- 拖了很久才勉强完成真是不好意思

## 数据导入
- `lib`文件夹下有一个`questions.json`文件，写入了一些模拟问题的数据。
- 使用`npm run import`即可导入数据库，注意这会清空之前的所有问题
- 可以手动修改`questions.xlsx`然后`node convert`生成自己要的`questions.json`，具体格式查看[excel-as-json](https://www.npmjs.com/package/excel-as-json)插件的文档

## 运行
- 使用`npm start`即可运行。之前要先打开`mongoDB`和`redis`（均在默认端口）
- 使用`REST Client`或类似工具可以进行测试，相应的HTTP代码已经写在`test`文件夹下的几个文件，注意`id`等属性要自己修改