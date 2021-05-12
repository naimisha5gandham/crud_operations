const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "my app",
    message: "Hello World",
  });
});

module.exports = router;