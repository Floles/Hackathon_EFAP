var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const quizz = require ('./quizz.json');


router.post('*', function (req, res, next) {
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
        speech: 'Votre boutique la plus proche est au 60 rue la Boetie 75008 Paris, ouverte jusqu\'à 22h30 ', 
        source: 'webhook'
      });
      break;
    case 'product':
      res.json({
        speech: 'Les meilleurs sushis sont chez Sushi Shop, venez déguster nos ' + req.body.result.parameters.product,
        source: 'webhook'
      });
      break;
    case 'command':
      res.json({
        speech: 'Les commandes via Google Home seront bientôt disponibles, en attendant jouons ensemble pour tenter de gagner une surprise gourmet, Es-tu prêt à faire un quizz ?',
        source: 'webhook'
      })
    case 'command.command-yes':
    //quizz[0].answers.filter(answer => answer.correct)
      res.json({
        speech: quizz[0].question + quizz[0].answers[0].text + ' ou '+ quizz[0].answers[1].text,
        source: 'webhook'
      })
    case 'command.command-yes.command-yes-question2':
      //quizz[0].answers.filter(answer => answer.correct)
        res.json({
          speech: quizz[1].question + quizz[1].answers[0].text + ' ou '+ quizz[1].answers[1].text,
          source: 'webhook'
        })
    case 'command.command-yes.command-yes-question2.command-yes-question3':
    //quizz[0].answers.filter(answer => answer.correct)
      res.json({
        speech: quizz[2].question + quizz[2].answers[0].text + ' ou '+ quizz[2].answers[1].text,
        source: 'webhook'
      })
  default:
      res.json({
        speech: 'Je n\'ai pas compris',
        source: 'webhook'
      });
  }
});

module.exports = router;