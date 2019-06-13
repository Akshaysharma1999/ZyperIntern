const route = require('express').Router()
const User = require('../models/user')
const Comment = require('../models/comment')

route.post('/add', (req, res, next) => {
    console.log(req.body)

    const user = new User()
    user.email = req.body.email
    user.name = req.body.name
    user.address = req.body.address
    user.phoneNum = req.body.phoneNum
    user.designation = req.body.designation

    for (let i = 0; i < req.body.interests.length; i++) {
        user.interests.push(req.body.interests[i])
    }

    User.findOne({ email: req.body.email }, (err, existinguser) => {

        if (existinguser) {
            console.log(req.body.email + " is already registered")
            return res.redirect('/add')
        }
        else {

            user.save((err, user) => {
                if (err) {
                    return next(err)
                }
                console.log("added succesfully")
                res.send("added successfully")
            })

        }
    })
})

route.post('/edit', (req, res, next) => {

    User.findOne({ _id: req.body._id }, (err, user) => {

        if (err) return next(err)

        if (req.body.name) user.name = req.body.name

        if (req.body.address) user.address = req.body.address

        if (req.body.phoneNum) user.phoneNum = req.body.phoneNum

        if (req.body.designation) user.designation = req.body.designation

        if (req.body.interests) {

            for (let i = 0; i < req.body.interests.length; i++) {
                user.interests.push(req.body.interests[i])
            }
        }


        user.save((err) => {
            if (err) return next(err)

            res.send("updated successfully ")
        })

    })

})


route.post('/delete', (req, res, next) => {

    User.deleteOne({ _id: req.body._id }, (err) => {
        if (err) next(err)

        res.send("deleted successfully")
    })
})


route.post('/query', (req, res, next) => {

    User.find({ interests: req.body.query }, (err, user) => {
        console.log(user)
        res.send(user)
    })
})

route.post('/comment', (req, res, next) => {

    const comment = new Comment
    comment.message = req.body.message
    comment.author = req.body.user_id

    comment.save((err) => {
        if (err) next(err)
        User.findOne({ _id: req.body.user_id }, (err, user) => {
            // console.log(user.comments)
            user.comments.push(comment)
            user.save(()=>{
                res.send("comment added successfully")
            })
        })

      })



})

module.exports = route