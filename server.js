const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const secret = require('./config/secret')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')

app.use('/',require('./routes/admin'))

mongoose.connect(secret.mongosecret, { useNewUrlParser: true }, (err) => {
    if (err) { return err }
    console.log('connected to db')
    app.listen(secret.port, () => { console.log("http://localhost:"+secret.port) })
})
