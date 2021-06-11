class Mongo {
    constructor() {

    }
    login(a, b, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('case');
            let user = db.collection('caseuser');
            // console.log(2)

            user.find({ username: a }).toArray((err, result) => {
                // console.log(result[0])
                if (result[0] && result[0].password == b) {
                    // str = "登录成功"
                    fn(result)
                    client.close()
                    // console.log("用户重复")
                } else {
                    // console.log(a,b)
                    // str = "用户名或密码错误"
                    // fn(result)
                    client.close()
                }
            })


        })
    }
    rgs(a, b, c, fn) {
        let str = ""
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;

        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('case');
            let user = db.collection('caseuser');
            console.log(2)
            user.find({ username: a }).toArray((err, result) => {
                // console.log(result[0])
                if (!result[0]) {
                    // str = "登录成功"
                    user.insertOne({ username: a, password: b, userurl: c }, (err, result1) => {

                        fn(result1)
                        client.close()

                    })
                    // console.log("用户重复")
                } else {
                    // console.log(a,b)
                    // str = "用户名或密码错误"
                    fn("用户名已存在")
                    client.close()
                }
            })



        })
    }
    cha(_id, fn) {
        let mongodb = require("mongodb");

        let mongoCt = mongodb.MongoClient;


        let obj = require("mongodb").ObjectId


        mongoCt.connect('mongodb://127.0.0.1:27017', (err, client) => {
            if (err) {
                throw err
            }

            let db = client.db('case');
            let user = db.collection('userhome');
            // console.log(2)


            // console.log(result[0])
            if (!_id) {
                user.find().toArray((err, result) => {
                    // console.log(result[0])
                    fn(result)
                    client.close()
                })
            } else {
                user.find({ _id: obj(_id) }).toArray((err, result) => {
                    // console.log(result[0])
                    fn(result)
                    client.close()
                })
            }



        })

    }
}
let mongo = new Mongo();
// console.log(mongo.login)
module.exports = mongo
