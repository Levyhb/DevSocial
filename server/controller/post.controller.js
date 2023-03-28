const postService = require("../service/post.service");

const newPost = async (req, res) => {
  const body = req.body;
  const { type, response } = await postService.newPost(body);
  res.status(type).json(response);
};

const updatePost = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const { type, response } = await postService.updatePost(body, id);
  res.status(type).json(response);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { type, response } = await postService.deletePost(id);
  res.status(type).json(response);
};

const likeDislikePost = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const { type, response } = await postService.likeDislikePost(body, id);
  res.status(type).json(response);
}

const getPost = async (req, res) => {
  const { id } = req.params;
  const { type, response } = await postService.getPost(id);
  res.status(type).json(response);
}

const getTimelinePost = async (req, res) => {
  const { userId } = req.params;
  const { type, response } = await postService.getTimelinePost(userId);
  res.status(type).json(response);
}

const getUsersAllPosts = async (req, res) => {
  const { username } = req.params;
  const { type, response } = await postService.getUsersAllPosts(username);
  res.status(type).json(response);
}

const newComment = async (req, res) => {
  const { id } = req.params;
  const body = req.body
  const { type, response } = await postService.newComment(body, id);
  res.status(type).json(response);
}

const getAllCommentsOfPost = async (req, res) => {
  const { id } = req.params;
  const { type, response } = await postService.getAllCommentsOfPost(id);
  res.status(type).json(response);
}

module.exports = {
  newPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getTimelinePost,
  getUsersAllPosts,
  newComment,
  getAllCommentsOfPost
};
