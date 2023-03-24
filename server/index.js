const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');
const helmet = require("helmet");
const app = express();

const PORT = process.env.PORT || 8800;

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const multer = require("multer");
const path = require("path");
dotenv.config();

const uri = process.env.MONGO_URI

mongoose.connect(uri, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log('Erro ao conectar ao MongoDB:', error);
  } else {
    console.log('Conexão bem-sucedida ao MongoDB!');
  }
});

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(corsOptions));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`application is running on port ${PORT}`);
});
