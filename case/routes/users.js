const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const { sign, decode, verify } = require("jsonwebtoken")
router.use("/", (req, res) => {
  let username = ""
  let password = ""
  if (!req.body.username) {
    username = qs.parse(url.parse(req.url).query).username
    password = qs.parse(url.parse(req.url).query).password
  } else {
    username = req.body.username
    password = req.body.password
  }
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  let mongo = require("../utils/mongodb");
  mongo.login(username, password, function fn(a) {
    res.send({ status: a })
    res.end()
  });
})


module.exports = router
