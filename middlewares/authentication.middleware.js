const jwt=require("jsonwebtoken")
require("dotenv").config();


const authentication=(req,res,next) => {

    const token=req.headers.authorization;
    if(token){
       const decoded=jwt.verify(token, process.env.secret_key)
       if(decoded){
        const userID=decoded.userID;
        req.body.userID=userID;
        next()
       }else{
        res.send({"msg":"Please Login First"})
       }
    }
    else{
        res.send({msg:"Please Login First"})
       }

}

module.exports={
    authentication
}