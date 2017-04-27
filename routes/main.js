var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('abcdefg');
    res.render('main', {
        sessionid: req.session.sessid
    });
});

module.exports = router;
