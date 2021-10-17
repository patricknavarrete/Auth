var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var bcrypt = require('bcrypt')

var functions = {
    addNew: function (req, res) {
        if ((!req.body.email) || (!req.body.password ) || (!req.body.firstName) 
        || (!req.body.lastName) || (!req.body.middleInitial) || (!req.body.address) 
        || (!req.body.phoneNumber)) || (!req.body.role)
         {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            var newUser = User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleInitial: req.body.middleInitial,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                role: req.body.role
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
             return res.json({success: true, decodedtoken})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    },

    postUserinfo: function(req,res){
        User.find({}, function(err,documents){
            if(err){
                res.send('Something went wrong');
            }
            else{
                res.send(documents);
            }
        })
    },
    
     changepass: function(req, res){
            let {newpass, password} = req.body;
            newpass = newpass.trim();
            password = password.trim();
           User.findOne({
                email:req.body.email
            },
            function (err, user){
               user.comparePassword(req.body.password, function(err, isMatch){ 
                        if(isMatch && !err){
    
                            bcrypt.genSalt(10, function(err, salt){
    
                                bcrypt.hash(newpass, salt, function(err,hash){
    
                                    newpass=hash;
    
                                    User.findOneAndUpdate(
                                        {email: req.body.email},
                                        {$set: {password:newpass}},
                                        (err, result) =>{
                                            if(err) return res.status (500).json({ msg: "Error updating password"});
    
                                            return res.json({ msg: newpass});
                                        }
                                    )
                                })
                            })
    
                              }
                        else{
                            return res.status(403).send({success:false, msg: 'Wrong Password'})
                        }
                    })
    
    
    
            })
        },
    
    changeFirstname: function(req, res){
            let {newfirstname} = req.body;
            newfirstname = newfirstname.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {firstName:newfirstname}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating firstname"});
    
                    return res.json({ msg: newfirstname});
               })
             })
    
        },

        changeLastname: function(req, res){
            let {newlastname} = req.body;
            newlastname = newlastname.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {lastName:newlastname}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating lastname"});
    
                    return res.json({ msg: newlastname});
               })
             })
    
        },

        changeMiddleinitial: function(req, res){
            let {newmiddleinitial} = req.body;
            newmiddleinitial = newmiddleinitial.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {middleInitial:newmiddleinitial}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating middleinitial"});
    
                    return res.json({ msg: newmiddleinitial});
               })
             })
    
        },

        changeAddress: function(req, res){
            let {newaddress} = req.body;
            newaddress = newaddress.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {address:newaddress}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating address"});
    
                    return res.json({ msg: newaddress});
               })
             })
    
        },

        changePhonenumber: function(req, res){
            let {newphonenumber} = req.body;
            newphonenumber= newphonenumber.trim();
    
           User.findOne({
                email:req.body.email
            },
            function (err, user){
    
                User.findOneAndUpdate(
                     {email: req.body.email},
                     {$set: {phoneNumber:newphonenumber}},
                      (err, result) =>{
                      if(err) return res.status (500).json({ msg: "Error updating Phone Number"});
    
                    return res.json({ msg: newphonenumber});
               })
             })
    
        },


    
}

module.exports = functions
