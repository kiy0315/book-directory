const express = require('express')
const app = express()
app.listen(7777)

const bookRouter = require('./routes/books')
const userRouter = require('./routes/users')


app.use("/books", bookRouter)
app.use("/", userRouter)

