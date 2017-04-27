const crypto = require('crypto-js/aes');
const secret = 'white_L0v3r';

//input = dynamoDB user object

//input style -> { id: blah, pw: blah }
//container style -> [ { createTime : numberblah }, { id: blah, pw: blah }]
module.exports.getEncryption = function(jsonInfo){
    var container = [];
    var createTime = Date.now();
        
    container.push({'createTime':createTime});
    container.push(jsonInfo);

    var encryptionData = crypto.encrypt(JSON.stringify(container), secret);
    return encryptionData + '';
};