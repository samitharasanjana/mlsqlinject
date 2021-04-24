var express = require('express');
var router = express.Router();
const MLmodel = require('../public/javascripts/MLmodel');
var path = require('path');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var mlmodel=new MLmodel();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'../public/Form.html'));
});

router.post("/search",function(req,res){

  if(mlmodel.checkSearchQuery(req.body.search))
  {
    res.send('Suspicious SQL injection attack query');
  }
  else
  {
    res.send("Normal search query");
  }

  //res.send('Successful search:'+mlmodel.showAlert(req.body.search));

});

router.get("/view_attacks",function(req,res){

  var attacks=mlmodel.viewAttackRecords(res);
  console.log("attacks:"+attacks);
  //res.send(attacks);

});



module.exports = router;
