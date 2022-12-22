const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const checkIfExistsEmail = await User.findOne({ email });
    const checkIfExistsUsername = await User.findOne({ username })


    if (checkIfExistsEmail) return res.status(400).json("Email is already registered");
    if (checkIfExistsUsername) return res.status(400).json("Username is already in use");

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
});


//LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password ) {
      return res.status(400).json({ message: "invalid fields" })
    }
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({message: "invalid email"})

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json({message: "invalid password"})

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;