const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.loginAdmin = (req, res) => {

    const { username, password } = req.body;
    if(password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({token,username});
    }else{
        res.status(401).json({message:'Invalid username or password'});
    }
}

exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})