const express = require("express");
const url = require("url")
const qs = require("querystring");
const { copyFileSync } = require("fs");
const router = express.Router();
const { sign, decode, verify } = require("jsonwebtoken")
router.use("/", (req, res) => {
    let _id = ""
    if (!req.body._id) {
        _id = qs.parse(url.parse(req.url).query)._id
    } else {
        _id = req.body._id
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    let mongo = require("../utils/mongodb");
    // let username=qs.parse(url.parse(req.url).query).username
    // let password=qs.parse(url.parse(req.url).query).password
    mongo.cha(_id, function fn(a) {
        res.send(a)
        res.end()
    });
})


module.exports = router
