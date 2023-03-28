const usersController = require("../controller/users.controller");
const router = require("express").Router();

// Get a user
router.get("/", usersController.getUserByQuerie);

// Get a User by Name (with regex)
router.get("/:username", usersController.getUsersByName);

// Update a user
router.put("/:id", usersController.updateUser);

// Delete user
router.delete("/:id", usersController.deleteUser);

// Get friends
router.get("/friends/:userId", usersController.getFriends);

//Follow a User
router.put("/:id/follow", usersController.followUser);

//Unfollow a User
router.put("/:id/unfollow", usersController.unfollowUser);

module.exports = router;
