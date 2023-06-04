const express=require('express');
const { where } = require('sequelize');
const router=express.Router();
const {Comments}=require('../models');
const {validateToken}=require('../validationmidlW/authenticatioMidlware.js')
const {Table}=require('../models');






router.post('/',validateToken,async(req,res)=>{
    const Comment=req.body;
    const Username=req.user.username;
    Comment.userName=Username;
    Comment.UserId=req.user.id;

    if(!req.body.comment==""){
        await Comments.create(Comment);
        res.json({Comment:Comment}); 
    
    } 
    else{
        res.send({error : "fill the input"})
    }     
}); 




router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const result=await Comments.findAll({where:{
        TableId:id
    }})
   res.json(result)
})

router.post('/delete',validateToken,async (req,res)=>{
    const username=req.body.userName;
    const id=req.body.id;
    if(username==req.user.username){
        const deleted=await Comments.destroy({
            where:{
                    id:id
            }
        });
         res.json('comment deleted')
    }else{
        res.json({error: "This comment can't be deleted"})
    }
   
})



router.post("/update",validateToken,async(req,res)=>{   

    const newcomment=req.body.comment;
    const id=req.body.id;
    const userName=req.body.userName;
    
    if(userName==req.user.username && !newcomment==""){
    const update= await Comments.update(
        {
            comment:newcomment  
        },
        {
            where:{
                id:id
            }
        }  
      
    )
    res.json('Comment updated');
    
   

} 
    else{
        res.json({error: "Comment can't be Updated"});
    }

})


module.exports=router;