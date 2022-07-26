const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;
const generateApiKey = require('generate-api-key').default



const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    companyName:{
        type: String,
        maxlength: 100
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String
    },
    api_key:{
        type: String
    },
    stripe_customer_id:{
        type: String
    },
    subscriptions: {
        type: []
    }
});


userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })



        });


    } else {
        next();
    }

})


userSchema.methods.comparePassword = function(canidatePassword, cb){
    var user = this;
   
    bcrypt.compare(canidatePassword, user.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}


userSchema.methods.generateKey = function(cb){
    var user = this;
    var key = generateApiKey()

    console.log(key, "This is the ke")

    user.api_key = key;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}





userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, config.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

userSchema.methods.deleteToken = function(token, cb){
    var user = this;

    user.updateOne({$unset:{token:1}}, function(err, user){
        if(err) return cb(err);
        cb(null,user)

    })
}


const User = mongoose.model("User", userSchema)
module.exports = { User }