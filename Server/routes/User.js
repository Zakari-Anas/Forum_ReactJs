const { application } = require('express');
const express=require('express');
const router=express.Router();
const {Users}=require('../models');
const bcrypt = require('bcrypt')

const {sign}=require('jsonwebtoken')//to secure the web site 

router.post('/register',async (req,res)=>{
    const{ username , password }=req.body;
    const user =await Users.findOne({
        where:{username:username}
    })
    if(!user){
    bcrypt.hash(password,10).then((hash)=>{

     const create= Users.create({
        username:username,
        password:hash,
      })
      if(create){
      res.json('user has been added to the data base')}
      
    })}
    else(
        res.json({error:"user can't be added"})
      )
  
})


router.post('/login',async (req,res)=>{

        const { username , password }=req.body;

        const user=await Users.findOne({
            where:{
                username:username,
            }
        })
        if(!user){ 
            res.json({error:"username does not match"})
        
        }

        else{
             bcrypt.compare(password,user.password).then((result)=>{

                if(!result) res.json({error:"password does not match current user"})
                  else{     
                const accessToken=sign({
                    username:user.username,
                    id:user.id,
               },'top secrete');
               res.json({accessToken:accessToken}) }
            })
         
        }
       
       
        

        


})




module.exports=router;