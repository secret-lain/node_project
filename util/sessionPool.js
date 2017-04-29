//세션 풀
var _currSessionPool = {};

var _printSessionPool = function(){
    for(var sessionData in _currSessionPool){
        console.log(sessionData);
    }
};

//세션을 검사한다.
var _checkSession = function(sessionId){
    _printSessionPool();
    if(sessionId in _currSessionPool){
        return true;
    } else return false;
};



//세션을 추가한다.
module.exports.inputSession = function(sessionId){
    console.log('New Session : ' + sessionId + ', Date is ' + Date.now);
    _currSessionPool[sessionId] = { 'sessionId' : sessionId , 'lastTime' : Date.now };
};

//최종접속기록 2시간이 지난 세션을 삭제한다.
module.exports.refreshSession = function(){
    var now = Date.now;

    for (var eachSession in _currSessionPool){
        if(now - eachSession.lastTime >= (1000 * 60 * 2)){
            console.log(sessionId + ' is expired');
            delete _currSessionPool[eachSession.sessionId];
        }
    }
};

module.exports.checkSession = _checkSession;
