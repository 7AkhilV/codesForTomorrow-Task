require('dotenv').config()
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({message:"login to access"})
    }
    const secretKey = process.env.secret_key
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
           console.error('token not valid');
        }
        req.user=user;
        next();
    })
}

module.exports = authMiddleware