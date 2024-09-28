const express = require('express')
const app = express()
app.listen(7777)

// uesr-demo 소환
const bookRouter = require('./routes/books')

// Router 실행
app.use("/books",bookRouter)
