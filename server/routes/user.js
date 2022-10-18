const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/auth')
const {api} = require('../middleware/apikey')
const stripe = require('stripe')(process.env.STRIPE_SECRET);



/// model

const {User} = require('../models/user');
const { reduceRight } = require('lodash');


router.post('/register', (req, response) =>{

    


    User.findOne({'email': req.body.email}, (err, user) =>{
        if(user){
            return response.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })}else{
            stripe.customers.create({email: req.body.email}).then(res =>{
                console.log(res.id)
                const user = new User({...req.body, stripe_customer_id: res.id})
                console.log(user)
                user.save((err, doc)=>{
                    if(err) return res.json({sucess: false});
                    // res.status(200).json({
                    //     sucess: true,
                    //     user: doc
                    // });
            
                    user.generateToken((err, user) =>{
                        if(err) return res.status(400).send(err);
                        response.cookie('auth',user.token).json({
                            auth: true,
                            userData:{
                                id: user._id,
                                email: user.email,
                                companyName: user.name,
                                stripe_customer_id: user.stripe_customer_id
                            }
                
                        })
                    })
            
                })
        
            })
        }
    });




});

router.post('/login', (req, res) =>{
    console.log(req.body.email)
    User.findOne({'email': req.body.email}, (err, user) =>{
        if(!user) return res.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })
            
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({
                auth: false,
                message: "Wrong Password",
                userData: false

            });



            user.generateToken((err, user) =>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    auth: true,
                    userData:{
                        id: user._id,
                        email: user.email,
                        companyName: user.companyName,
                        stripe_customer_id:user.stripe_customer_id
                    }

                })
            })
        })
    })

});

router.get('/auth', auth, (req, res) =>{
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            companyName: req.user.companyName,
            role: req.user.role,
            api_key: req.user.api_key,
            stripe_customer_id: req.user.stripe_customer_id,
            subscriptions: req.user.subscriptions
        }
    })
})



router.get('/apiCheck', api, (req, res)=>{
    res.json({
        isPaid: true,
    })
})



router.get('/apiKey', auth, (req, res)=>{

    console.log(req.user)
    User.findOne({'email': req.user.email}, (err, user) =>{
        if(!user) return res.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })

        user.generateKey((err, user) =>{
            if(err) return res.status(400).send(err);
            res.status('200').json({
                auth: true,
                userData:{
                    id: user._id,
                    email: user.email,
                    companyName: user.companyName,
                    role: user.role,
                    api_key:user.api_key
                }

            })
        })
    
    })

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kyleschneiderx@gmail.com',
        pass: process.env.GMAILKEY
    }
    });

    const mailOptions = {
    from: 'hello@chellbloom.com',
    to: `${req.user.email}`,
    subject: 'Shellbloom Chrome Extension Link',
    text: 'https://chrome.google.com/webstore/detail/shellbloom/bdkcgjmapbofhonlhkackbmaillfalne?hl=en&authuser=0'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });

    
})

router.get('/newApiKey', auth, (req, res)=>{

    console.log(req.user)
    User.findOneAndUpdate({'email': req.user.email}, {'api_key': ''}, {new: true}, (err, user) =>{
        if(!user) return res.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })

        user.generateKey((err, user) =>{
            if(err) return res.status(400).send(err);
            res.status('200').json({
                auth: true,
                userData:{
                    id: user._id,
                    email: user.email,
                    companyName: user.companyName,
                    api_key:user.api_key
                }

            })
        })
    
    })
    
})





router.get('/logout', auth, (req, res) =>{
    req.user.deleteToken(req.user.token, function(err,user){
        if(err) return res.status(400).send(err);
        res.status(200).send("Goodbye");

    })
})



module.exports = router;