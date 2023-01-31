const router = require("express").Router();

const Post = require("../models/Post");
const User = require("../models/User");

//Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("you can update only your posts");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    return res.status(200).json("Post has been deleted");

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Like/Dislike a Post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get timiline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followers.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get users all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Comment a post 

router.put("/:id/comments", async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const newComment = { userId, comment };
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("The post has been commented");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
