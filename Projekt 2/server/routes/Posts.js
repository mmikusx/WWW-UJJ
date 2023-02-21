const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get("/byID/:id", async (req, res) => {
   const id = req.params.id;
   const post = await Posts.findByPk(id);
   res.json(post);
});

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
});

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