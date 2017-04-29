var crypto = require('crypto-js');
var secret = 'white_L0v3r';
var decrypt = function(encryptionData){
    var decryptionDataByte = crypto.AES.decrypt(encryptionData, secret);
    var decryptionDataObject = JSON.parse(decryptionDataByte.toString(crypto.enc.Utf8));

    return decryptionDataObject;
}
//input = dynamoDB user object
//input style -> { id: blah, pw: blah }
//container style -> [ { id: blah, pw: blah }, { createTime : numberblah }]
module.exports.getEncryption = function(jsonInfo){
    var container = [];
    var createTime = Date.now();

    container.push(jsonInfo);
    container.push({'createTime':createTime});

    var encryptionData = crypto.AES.encrypt(JSON.stringify(container), secret);
    return encryptionData + '';
};

//input encyprtedSessionId
module.exports.getID = function(encryptionData){
    var userInfo = decrypt(encryptionData);

    return userInfo[0].id;
}
