var AWS = require('aws-sdk');
var encrypt = require('../util/encrypt');
AWS.config.update({
    region: 'us-west-2'
});
var db = new AWS.DynamoDB.DocumentClient();
var userTableName = 'users'

//input - 로그인할 id, pw
/*
output async - 결과.
DynamoDB에러시 에러메세지를 전송.
비번 혹은 아디 불일치시 wrong password or id
존재시 세션값으로 사용될 암호화키를 전송.
*/
module.exports.userLogin = function(id, pw, callback){
    var params = {
        TableName: userTableName,
        Key: {
            "id": id
        }
    };
    
    db.get(params, function (err, data) {
        if (err) {
            //서버문제 혹은 DynamoDB 처리결과에 문제가 있는 경우.
            callback({error: true, errorMessage: err, response: 'loginError'});
        } else {
            //정상적으로 결과를 받아올 수 있었던 경우.
            //아이디가 존재하고 비밀번호도 일치하는 경우.
            if (Object.keys(data).length != 0 && data.Item.pw == pw) {
                var encryptionSessData = encrypt.getEncryption(data.Item);
                
                callback({error: false, result: true, response:encryptionSessData});
            } else {
                //아이디는 존재하지만 비밀번호가 일치하지 않는 경우.
                callback({error: false, result: false,  response:'wrong password or id'});
            }
        }
    });
};

/*router.post('/regist', function (req, res, next) {
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
});*/