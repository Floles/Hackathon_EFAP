var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.all('*', function (req, res, next) {
  fs.readFile(path.join(__dirname, 'store.json'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var store = JSON.parse(data).filter(el => {
      return el.id_store == 1;
    });
    console.log(store);
  });

  switch (req.body.result.action) {
    case 'location':
      res.json({
        speech: 'Le plus proche est à ' + req.body.result.parameters['geo-city'],
        source: 'webhook'
      });
      break;
    case 'price':
      // Sur le site de sushi shop -> cheerio -> récupérer le prix 
      res.json({
        speech: 'Le prix est ...',
        source: 'webhook'
      });
      break;
      console.log(req.body.result.parameters);
    case 'product':
      res.json({
        speech: 'le produit est ' + req.body.result.parameters.product,
        source: 'webhook'
      });
      break;
    case 'street-address':
      res.json({
        speech: 'Je suis au ' + req.body.result.parameters.location,
        source: 'webhook'
      });
      break;
    default:
      res.json({
        speech: 'Je n\'ai pas compris',
        source: 'webhook'
      });
  }
});

module.exports = router;