const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const app = express()

app.get('/', (req, res) => {
  res.send('hello express')
})

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), (req, res, next) => {
  res.send(req.file.filename)
})

app.get('/preview/:key', cors(), (req, res) => {
  console.log(req.params.key)
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    },
    (error) => {
      console.log(error)
      // res.status(404).send('Not found')
    }
  )
})

app.listen(3000, () => {
  console.log('server is running')
})
