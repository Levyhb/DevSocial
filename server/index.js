const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");

const PORT = process.env.PORT || 8800;

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const multer = require("multer");
const path = require("path");

dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (res, req) => {
  res.status(200).send("Security into a Node.js API");
});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Conected to MongoDb");
  }
);

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
