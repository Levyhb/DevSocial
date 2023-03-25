const User = require("../models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update a user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

// Get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a User by Name (with regex)
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.find({
      username: { $regex: "^" + username, $options: "i" },
    });
    const everyUser = user.map(
      ({ id, username, profilePicture, followers, followings }) => ({
        id,
        username,
        profilePicture,
        followers,
        followings,
      })
    );
    res.status(200).json(everyUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

//Follow a User
router.put("/:id/follow", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {}
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//Unfollow a User

router.put("/:id/unfollow", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {}
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;
