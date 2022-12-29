const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const PORT = 8800;

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const multer = require("multer");
const path = require("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }, () => {
  console.log('Conected to MongoDb')
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + file.originalname;
    cb(null, newFileName );
  }
});

const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) =>{
  try {
    return res.status(200).json("file uploaded successfully")
  } catch (err) {
    console.log(err);
  }
})

app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/posts', postsRoute);



app.listen(PORT, () => {
  console.log(`application is running on port ${PORT}`)
})