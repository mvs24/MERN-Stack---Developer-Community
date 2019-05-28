const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// route to get user (logged in) profile

router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    let errors = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
        if(profile){
            res.json(profile);
        } else {
            errors.noprofile = 'No profile found'
            return res.status(404).json(errors)
        }
    }).catch(err=>{
        res.status(404).json(err);
    })
})


module.exports=router;