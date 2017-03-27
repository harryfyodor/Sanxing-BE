let convertExcel = require('excel-as-json').processFile
let path = require('path')

convertExcel(path.resolve(__dirname, 'questions.xlsx'), path.resolve(__dirname, 'questions.json'), null, (err, data) => {
  if (err) console.log(err)
  else console.log('done')
})
