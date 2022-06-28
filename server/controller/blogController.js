const slugify = require('slugify');
const blogs = require('../models/blogs');
const {v4:uuidv4} = require('uuid');

exports.create=(req,res)=>{
    const {title,content,author}=req.body;
    let slug = slugify(title);

    if(!slug)slug=uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({result:"error", error:"Title is required"});
            break
        case !content:
            return res.status(400).json({result:"error", error:"Content is required"});
            break
        case !author:
            return res.status(400).json({result:"error", error:"Author is required"});
            break
    }
    //save to database
    blogs.create({ title, content, author, slug },(err,data)=>{
        if(err){
            return res.status(400).json({result:"error", error:err});
        }
        res.json(data)
    })
}

//get all blogs from database
exports.getAllBlogs=(req,res)=>{
    blogs.find({}).exec((err,data)=>{
        res.json(data)
    })
}

//search blog by slug
exports.getSingleBlog=(req,res)=>{
    const {slug} = req.params;
    blogs.findOne({slug}).exec((err,data)=>{
        res.json(data)
    })
}

exports.removeBlog=(req,res)=>{
    const {slug} = req.params;
    blogs.findOneAndDelete({slug}).exec((err,data)=>{
        if(err) console.log(err);
        res.json({
            result:"Your blog has been deleted.",
            data:data
        })
    })
}

exports.updateBlog=(req,res)=>{
    const {slug} = req.params;
    const {title,content,author}=req.body;
    blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,data)=>{
        if(err)console.log(err);
        res.json(data)
    })
}