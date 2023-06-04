const express=require('express');
const router=express.Router();
const {validateToken}=require('../validationmidlW/authenticatioMidlware.js')
const {Table}=require('../models');


router.post("/",validateToken,async (req,res)=>{
   const post=req.body;
   const user=req.user.username;
   post.username=user;
   const table=await Table.create(post);
   if(!table){
    res.json({error:"Comment can't be added"})
   }
   else{res.json({post:post})}
   
});
router.get('/:id',async(req,res)=>{
    let id=req.params.id;
    let post=await Table.findByPk(id);
    res.send(post)
})

router.get('/',async (req,res)=>{
    const tableList=await Table.findAll();
    res.send(tableList) 


})


router.post('/delete',validateToken,async (req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const username=req.user.username
    if(name==username){    
        const deleted=await Table.destroy({
                where:{
                        id: id
                }
            });
    
            res.json("Post deleted")
        }
    else{
        res.json({error:"Post can't be deleted"})
    }


})

module.exports=router;