const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) =>{
    try {
        const {username, email, password} = req.body;

        const usernameCheck = await User.findOne({username});
        const emailcheck = await User.findOne({email});

        if(usernameCheck){
            return res.json({msg : "Username already used", status : 'false'});
        }

        if(emailcheck){
            return res.json({msg : "Email already used", status : 'false'});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password : hashPassword
        });

        delete user.password;
        return res.json({status : 'true', user})
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.json({msg : "Email does not match!", status : 'false'})
        }

        const isPasswordAvaiable = await bcrypt.compare(password, user.password);
        if(!isPasswordAvaiable){
            return res.json({msg : "Incurrect Password", status : 'false'});
        }

        delete user.password;
        return res.json({status : 'true', user});
        
    } catch (error) {
        next(error);
    }
}