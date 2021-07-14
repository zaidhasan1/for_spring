var express = require('express');
var router = express.Router();
const User = require("../controller/User")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/check_login", User.checkLogin)

router.post("/add_user", User.addUser);

router.get("/all_data",User.allData)

module.exports = router;
