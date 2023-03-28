const router = require("express").Router();
const postController = require("../controller/post.controller")

//Create a post
router.post("/", postController.newPost);

//Update a Post
router.put("/:id", postController.updatePost);

//Delete a post
router.delete("/:id", postController.deletePost);

// Like/Dislike a Post
router.put("/:id/like", postController.likeDislikePost);

// Get a post
router.get("/:id", postController.getPost);

// get timiline posts
router.get("/timeline/:userId", postController.getTimelinePost);

// Get users all posts
router.get("/profile/:username", postController.getUsersAllPosts);

// Comment a post 
router.put("/:id/comments", postController.newComment);

// Get all comments of the post
router.get("/:id/comments", postController.getAllCommentsOfPost);

module.exports = router;
