const jwt=require('jsonwebtoken')




module.exports = function(req,res,next){
    try{
        let token=req.header('x-token');
        if (!token){
            res.status(403).send('Token not found');
        }
        let decoded=jwt.verify(token,'jwtpassword');
        req.user=decoded.user
        next();
    }
    catch(err){
        return res.status(400).send(err)
    }
}