const User = require("../models/User");

const updateUser = async (body, id) => {
  if (body.userId === id || body.isAdmin) {
    if (body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
      } catch (err) {
        return { type: 500, response: err };
      }
    }

    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: body,
      });

      return { type: 200, response: "Account has been updated" };
    } catch (err) {
      return { type: 500, response: err };
    }
  } else {
    return { type: 403, response: "you can update only your account" };
  }
};

const deleteUser = async (body, id) => {
  if (body.userId === id) {
    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json("Account has been deleted");
    } catch (err) {
      return { type: 500, response: err };
    }
  } else {
    return { type: 403, response: "you can delete only your account" };
  }
};

const getFriends = async (userId) => {
  try {
    const user = await User.findById(userId);
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

    return { type: 200, response: friendList };
  } catch (err) {
    return { type: 500, response: err };
  }
};

const getUserByQuerie = async (query) => {
  try {
    const user = query.userId
      ? await User.findById(query.userId)
      : await User.findOne({ username: query.username });
    const { password, updatedAt, ...userInfo } = user._doc;
    return { type: 200, response: userInfo };
  } catch (err) {
    return { type: 400, response: err };
  }
};

const getUsersByName = async (username) => {
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
    return { type: 200, response: everyUser };
  } catch (error) {
    return { type: 400, response: err };
  }
};

const followUser = async (id, userId) => {
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        return { type: 200, response: "user has been followed" };
      } else {
        return { type: 403, response: "you already follow this user" };
      }
    } catch (err) {
      return { type: 500, response: err };
    }
  } else {
    return { type: 403, response: "You can't follow yourself" };
  }
};

const unfollowUser = async (id, userId) => {
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        return { type: 200, response: "user has been unfollowed" };
      } else {
        return { type: 403, response: "you don't follow this user" };
      }
    } catch (err) {
      return { type: 500, response: err };
    }
  } else {
    return { type: 403, response: "You can't unfollow yourself" };
  }
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
