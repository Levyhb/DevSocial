const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (username, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const checkIfExistsEmail = await User.findOne({ email });
  const checkIfExistsUsername = await User.findOne({ username })

  if (checkIfExistsEmail) return {type: 400,response: "Email is already registered"};
  if (checkIfExistsUsername) return {type: 400,response: "Username is already in use"};

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
  const user = await newUser.save();

  return { type: 201, response: user }
}

const login = async (email, password) => {
  if (!email || !password) {
    return { type: 400, response: "invalid fields" };
  }
  const user = await User.findOne({ email });
  if (!user) return { type: 400, response: "invalid email" };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return { type: 400, response: "invalid password" };

  return { type: 200, response: user };
};

module.exports = {
  login,
  register
};
