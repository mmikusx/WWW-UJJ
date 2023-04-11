const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

//get all posts
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

//get post by id
router.get("/byID/:id", async (req, res) => {
   const id = req.params.id;
   const post = await Posts.findByPk(id);
   res.json(post);
});

//create post
router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
});

//delete post by id
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;

    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    res.json("usunieto post")

});

module.exports = router;