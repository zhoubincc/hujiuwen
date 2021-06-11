const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const { sign, decode, verify } = require("jsonwebtoken")
router.use("/", (req, res) => {
    let username = ""
    let password = ""
    let userurl = ""
    if (!req.body.username) {
        username = qs.parse(url.parse(req.url).query).username
        password = qs.parse(url.parse(req.url).query).password
        userurl = qs.parse(url.parse(req.url).query).userurl

    } else {
        username = req.body.username
        password = req.body.password
        userurl = req.body.userurl
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    let mongo = require("../utils/mongodb");
    // console.log(username, password, userurl)
    console.log(1)
    mongo.rgs(username, password, userurl, function fn(a) {
        res.send({ status: a })
        res.end()
    });
})


module.exports = router
