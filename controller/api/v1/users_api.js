const User = require('../../../model/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password ){
            return res.status(422).json( {
                message: 'invalid username or password'
            })
        }
        return res.status(200).json({
            message: 'sign-in successful, here is your token, please keep it safe!',
    
            data:{
                token: jwt.sign(user.toJSON(), 'codeil', {expiresIn:'100000000'})
            }
        })
    }catch(err){
        console.log('******', err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
   
}