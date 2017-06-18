var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/get_dockerfile_data', function(req, res, next){
    conn = mysql.createConnection({
        'host' : '59.110.215.215',
        'port' : 3306,
        'user' : 'remote',
        'password' : '080078',
        'database' : 'dockerteam'
    });
    conn.connect();
  var qStr = 'SELECT dockerhub_url, dockerfile_content FROM dockerfile WHERE dockerfile_name=?';
  var jsonRes = {};
  conn.query(qStr, [req.body.dockerImageName], function(err, rows){
      if (err) throw err;
      if (rows.length > 0) {
        jsonRes = {'dockerhub_url': rows[0]['dockerhub_url'], 'dockerfile_content': rows[0]['dockerfile_content']};
        res.json(jsonRes);
      }
  });
  conn.end();
  console.log("database end");
});

module.exports = router;
