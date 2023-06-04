const {verify}=require('jsonwebtoken')





const validateToken=(req,res,next)=>{
    const accessToken=req.header('accessToken');
    if(!accessToken){return res.json({error:'user not loged in '})};


try{
    const validateToken=verify(accessToken,'top secrete')
        req.user=validateToken;
    if(validateToken){ 
        return next();
    }
}catch(error){
    res.json({error:error})
}


}

module.exports={validateToken}; 