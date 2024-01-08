const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");

//image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
  },
});

// it just like a milddware
var upload = multer({
  storage: storage,
}).single("image");

//insert an user into database rout
router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  user.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = { 
        type: "success",
        message: "User added successfully!",
      };
      res.redirect("/");
    }
  });
});

// router.get("/users", (req, res) => {
//   res.send("All users");
// });

// router.get("/", (req, res) => {
//   res.send("Home page content");
// });
//home page route
router.get("/", (req, res) => {
  res.render("index", { title: "Home page" });
});
//Add user
router.get("/add", (req, res) => {
  res.render("add_user", { title: "Add User" });
});

module.exports = router;
