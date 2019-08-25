const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// input validation
 const validateRegisterInput = require('../../validation/register');

 // user model
const User = require('../../models/User')

router.post('/register', (req, res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }



    User.findOne({ email: req.body.email }).then(user=>{
        if(user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }else{
            const avatar = gravatar.url(req.body.email, {
                s:'200', //size
                r:'pg', //rating
                d:'mm' //default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });


            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((savedUser)=>{
                        res.json(savedUser)
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            })
        }
    })
})


router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user=>{
        if(user){
            bcrypt.compare(password, user.password).then(isMatch=>{
                if(isMatch){
                    // jwt payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    //sign jwt token
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token)=>{
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    })
                }else{
                   return res.status(400).json({password: 'Password Incorrect'})
                }
            })
        }else{
            return res.status(404).json({email: "Email not found"})
        }
    })
})



router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.json({
        id: req.user.id, 
        name: req.user.name,
        email: req.user.email,
    });
})




module.exports=router;