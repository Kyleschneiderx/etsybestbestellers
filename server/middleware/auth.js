const {User} =  require('../models/user');



const auth = (req,res, next) => {
    var token = req.cookies.auth;
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.send(false)
        req.token = token;
        req.user = user
        next();
    })

    

};


module.exports = {auth};