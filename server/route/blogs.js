const express = require('express');
const router = express.Router();
const {create, getAllBlogs, getSingleBlog, removeBlog, updateBlog} = require('../controller/blogController');
const {requireLogin} = require('../controller/authenController');

router.post("/create", requireLogin, create);
router.get('/blogs', getAllBlogs)
router.get('/blog/:slug', getSingleBlog)
router.delete("/blog/:slug", requireLogin, removeBlog);
router.put("/blog/:slug", requireLogin, updateBlog);

module.exports = router;