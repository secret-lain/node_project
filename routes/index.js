var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.sessid)req.session.destroy(function(err){
        console.log('loginPage/SessionDestroy Error : ' + err );
    });
  res.render('index', {title : 'TitleFromNode'});
});

module.exports = router;
