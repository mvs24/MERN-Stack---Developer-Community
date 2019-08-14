const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validation
const validateProfileInput = require('../../validation/profile');

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

// create a profile from a registered user

router.post('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    const profileFields = {};
    profileFields.user = req.user.id;

    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }

    if(req.body.handle) profileFields.handle = req.body.handle; 
    if(req.body.company) profileFields.company = req.body.company; 
    if(req.body.website) profileFields.website = req.body.website; 
    if(req.body.location) profileFields.location = req.body.location; 
    if(req.body.bio) profileFields.bio = req.body.bio; 
    if(req.body.status) profileFields.status = req.body.status; 
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername; 
   
    // skills
    if(typeof req.body.skills !== "undefined"){
        profileFields.skills = req.body.skills.split(",")
    } 

    // social 
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube; 
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin; 
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter; 
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook; 
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram; 
     
    Profile.findOne({ user: req.user.id }).then(profile=>{
        if (profile) {
            // update
            Profile.findOneAndUpdate({ user:req.user.id }, { $set: profileFields }, { new: true }).then(profile => {
                res.json(profile);                
            })
        } else {
            // create
            Profile.findOne({handle: profileFields.handle}).then(profile=>{
                if(profile){
                    errors.handle = "That handle already exists";
                    res.status(400).json(errors);
                }
               const newProfile = new Profile(profileFields);
               newProfile.save().then(savedProfile=>{
                    res.json(savedProfile);
                })
            })
        }
    })
})


module.exports=router;