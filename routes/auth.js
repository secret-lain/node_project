var AWS = require('aws-sdk');
var express = require('express');
var encrypt = require('../util/encrypt');
var router = express.Router();

AWS.config.update({
    region: 'us-west-2'
});
var db = new AWS.DynamoDB.DocumentClient();
var userTableName = 'users'

var database = require('../util/database');

/* 로그인 페이지 JSON 함수 처리 루트. */
router.post('/login', function (req, res, next) {
    database.userLogin(req.body.id, req.body.pw, function (resultJSON) {
        console.log('/login : ' + resultJSON.error + ',' + resultJSON.response);
        
        //에러가 나지 않았고, 로그인이 성공적인 경우는 json결과가 아닌 다음페이지로 리다이렉션한다.
        if(!resultJSON.error && resultJSON.result){
            req.session.sessid = resultJSON.response;
        }
        res.json(resultJSON);
    });
});

router.post('/regist', function (req, res, next) {
    var pw = req.body.pw;
    var id = req.body.id;
    var checkPw = req.body.checkPW;

    console.log(pw + ',' + id + ',' + checkPw);
    if (pw != checkPw) {
        res.end('wrong password');
    } else {
        var params = {
            TableName: userTableName,
            Item: {
                "id": id,
                "pw": pw
            }
        };

        db.put(params, function (err, data) {
            if (err) {
                res.write('<pre>' + err + '</pre>');
                res.end('failed');
            } else {
                res.end('succes');
            }
        });
    }
});

module.exports = router;
