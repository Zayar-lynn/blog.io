const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(upload.none());

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const success = bcrypt.compareSync(password, userDoc.password);
  if (success) {
    jwt.sign(
      { username, user_id: userDoc._id },
      process.env.JWT_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          username,
          user_id: userDoc._id,
        });
      }
    );
  } else {
    res.status(400).json("wrong user credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token !== null && token !== undefined && token !== "") {
    jwt.verify(token, process.env.JWT_KEY, {}, (err, userInfo) => {
      if (err) throw err;
      res.status(200).json(userInfo);
    });
  } else {
    res.status(401).json({});
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout successful");
});

// CRUD Operation
app.post("/upload", (req, res) => {
  const { token } = req.cookies;
  if (token !== null && token !== undefined && token !== "") {
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userInfo) => {
      if (err) {
        res.status(401).json({ message: "User not auth." });
      }

      const { title, imageUrl, content } = req.body;
      const postDoc = await Post.create({
        title,
        imageUrl,
        content,
        author: userInfo.user_id,
      });
      res.status(200).json(postDoc);
    });
  } else {
    res.status(401).json({ message: "User not auth." });
  }
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["username"]);
  res.status(200).json(post);
});

app.get("/edit-post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.status(200).json(post);
});

app.put("/update-post", (req, res) => {
  const { token } = req.cookies;
  if (token !== null && token !== undefined && token !== "") {
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userInfo) => {
      if (err) {
        res.status(401).json({ message: "User not auth." });
      }

      const { title, imageUrl, content, id, authorId } = req.body;
      if (authorId === userInfo.user_id) {
        const postDoc = await Post.findById(id);
        postDoc.title = title;
        postDoc.imageUrl = imageUrl;
        postDoc.content = content;
        postDoc.save();
        res.status(200).json(postDoc);
      } else {
        res.status(401).json({ message: "User not auth." });
      }
    });
  } else {
    res.status(401).json({ message: "User not auth." });
  }
});

app.delete("/post-delete/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  res.status(200).json({ message: "Post Deleted." });
});

app.listen(8080, () => {
  console.log("server is running");
});
