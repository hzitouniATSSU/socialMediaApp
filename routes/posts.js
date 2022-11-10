const router = require("express").Router();
const Post = require("../models/Post");
//create a post 
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err)
    }
});
//update a post 
router.put("/:id", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("your post has been updated");

    }else{
        res.status(403).json("you can update your post only")
    }
}catch(err){
res.status.apply(500).json(err);
}
});
//delete a post 
router.delete("/:id", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId){
        await post.deleteOne();
        res.status(200).json("your post has been deleted");

    }else{
        res.status(403).json("you can delete your post only")
    }
}catch(err){
res.status.apply(500).json(err);
}
});
// like a post 
router.put("/:id/like", async(res,req)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes : req.body.userId}});
            res.status(200).json("post has been liked");
        }else{
            await post.updateOne({$pull : {likes: req.body.userId}});
            res.status(200).json("the post has been disliked");
        }


    }catch(err){
        res.status(500).json(err);
    }
});
//get a post 
//get timelime posts


module.exports = router;