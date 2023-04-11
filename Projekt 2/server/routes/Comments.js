const express = require("express");
const router = express.Router();
const { Comments, Posts} = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//get all comments from post with postId
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

//create comment
router.post("/", validateToken, async (req, res) => {
   const comment = req.body;
   const username = req.user.username;
   // add username atribute to comment object (which is equal to username logged in)
   comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

//delete comment by id
router.delete("/:commentId", validateToken, async (req, res) => {
   const commentId = req.params.commentId;

   await Comments.destroy({
       where: {
           id: commentId,
       },
   });

   res.json("usunieto komentarz")

});

module.exports = router;