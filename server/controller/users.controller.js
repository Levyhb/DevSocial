const userService = require("../service/users.service");

const updateUser = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const { type, response } = await userService.updateUser(body, id);
  return res.status(type).json(response);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { type, response } = await userService.deleteUser(body, id);
  return res.status(type).json(response);
};

const getFriends = async (req, res) => {
  const { userId } = req.params;
  const { type, response } = await userService.getFriends(userId);
  return res.status(type).json(response);
};

const getUserByQuerie = async (req, res) => {
  const query = req.query;
  const { type, response } = await userService.getUserByQuerie(query);
  return res.status(type).json(response);
};

const getUsersByName = async (req, res) => {
  const { username } = req.params;
  const { type, response } = await userService.getUsersByName(username);
  return res.status(type).json(response);
};

const followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { type, response } = await userService.followUser(id, userId);
  return res.status(type).json(response);
};

const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { type, response } = await userService.unfollowUser(id, userId);
  return res.status(type).json(response);
};

module.exports = {
  updateUser,
  deleteUser,
  getFriends,
  getUserByQuerie,
  getUsersByName,
  followUser,
  unfollowUser,
};
