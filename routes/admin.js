const route = require('express').Router()
const User = require('../models/user')
const Comment = require('../models/comment')

route.get('/add',(req,res,next)=>{
    res.render('add')
})

route.post('/add', (req, res, next) => {
    console.log(req.body)

    const user = new User()
    user.email = req.body.email
    user.name = req.body.name
    user.address = req.body.address
    user.phoneNum = req.body.phoneNum
    user.designation = req.body.designation

    let interests = req.body.interests.split(',')

    for (let i = 0; i < interests.length; i++) {
        user.interests.push(interests[i])
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
                // res.send("added successfully")
                res.redirect('/')
            })

        }
    })
})

route.get('/edit',(req,res,next)=>{

    User.find({},(err,users)=>{
        if(err) next(err)

        res.render('edit_page',{users:users})
    })
})

route.get('/edit/:id',(req,res,next)=>{
   console.log(req.params.id)
   User.findOne({_id:req.params.id},(err,user)=>{
       if(err) next(err)
       res.render('edit_user',{user:user})
   })
})

route.post('/edit', (req, res, next) => {
    
    User.findOne({ _id: req.body._id }, (err, user) => {
        if (err) return next(err)

        if (req.body.name) user.name = req.body.name

        if (req.body.address) user.address = req.body.address

        if (req.body.phoneNum) user.phoneNum = req.body.phoneNum

        if (req.body.designation) user.designation = req.body.designation

        let interests = req.body.interests.split(',')


        if (interests) {

            for (let i = 0; i < interests.length; i++) {
                user.interests.push(interests[i])
            }
        }
        user.save((err) => {
            if (err) return next(err)

            res.send("updated successfully ")
        })
    })
})

route.get('/delete',(req,res,next)=>{
    User.find({},(err,users)=>{
        if(err) next(err)
        res.render('delete_page',{users:users})
    })
})

route.get('/delete/:id', (req, res, next) => {

    User.deleteOne({ _id: req.params.id }, (err) => {
        if (err) next(err)

        res.send("deleted successfully")
    })
})

route.get('/query',(req,res,next)=>{
    res.render('query')
})

route.post('/query', (req, res, next) => {

    User.find({ interests: req.body.query }, (err, user) => {
        console.log(user)
        res.send(user)
    })
})

route.get('/comment',(req,res,next)=>{
    User.find({},(err,users)=>{
        if(err) next(err)

        res.render('comment_page',{users:users})
    })
})

let from ,to
route.get('/f_comment/:id',(req,res,next)=>{
    from = req.params.id
    User.find({},(err,users)=>{
        if(err) next(err)
        res.render('tcomment_page',{users:users})
    })
})

route.get('/f_comment/t_comment/:id',(req,res,next)=>{
    to = req.params.id
    res.render('comment_form')
})

route.post('/comment', (req, res, next) => {

    const comment = new Comment
    comment.message = req.body.message
    comment.to = to
    comment.by = from

    comment.save((err) => {
        if (err) next(err)
        User.findOne({ _id: to }, (err, user) => {
            // console.log(user.comments)
            user.comments.push(comment)
            user.save(()=>{
                res.send("comment added successfully")
            })
        })

      })
})

route.get('/getComments',(req,res,next)=>{
    User.find({},(err,users)=>{
        if(err) next(err)
        res.render('getComments',{users:users})
    })
})

route.get('/getComments/:id',(req,res,next)=>{
        
        Comment.find({by:req.params.id},(err,comments)=>{
            if(err) next (err)

            res.send(comments)
        })

})

module.exports = route