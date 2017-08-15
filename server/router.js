(function() {
  var express = require('express');
  var router = express.Router();
  const request = require('superagent');
  const async = require('async');

  const TARGET_HOST = '172.16.101.61';
  //const CHIQ_PARSER_URL = 'http://' + TARGET_HOST + ":"
  const COMMON_PARSER_URL = 'http://' + TARGET_HOST + ':14901/common-parser-service';
  const CONTROLLER_URL = 'http://' + TARGET_HOST + ':11180/chiq/chat';
  const INTENT_URL = 'http://' + TARGET_HOST + ':14399/intent';
  const NLU_URL = 'http://' + TARGET_HOST + ':13901/parse';

  router.use(function timeLog(req, res, next) {
    next();
  });

  // router.get('/chiqParser', (req, res) => {
  //   if (!req.query.hasOwnProperty('text') || req.query.text === '') {
  //     return res.send({});
  //   }

  //   request
  //     .get(MUSIC_URL + req.query.text)
  //     .end((err, result) => {
  //       if (err || !result.hasOwnProperty('text')) {
  //         res.send({});
  //         return;
  //       }
  //       res.send(JSON.parse(result.text));
  //     });
  // });

  router.get('/commonParser', (req, res) => {
    if (!req.query.hasOwnProperty('text') || req.query.text === '') {
      return res.send({});
    }

    request
      .get(COMMON_PARSER_URL)
      .type('json')
      .query({ 
        text: req.query.text, 
        tags: 'album_name_module,song_name_module,star_name_module,adjust_volume_module,adjust_light_module,movie_name_module,teleplay_name_module'
      })
      .end((err, result) => {
        if (err || !result.hasOwnProperty('text')) {
          res.send({});
          return;
        }
        res.send(JSON.parse(result.text));
      });
  });

  router.get('/controller', (req, res) => {
    if (!req.query.hasOwnProperty('text') || req.query.text === '') {
      return res.send({});
    }

    request
      .get(CONTROLLER_URL)
      .type('json')
      .query({ 
        text: encodeURI(req.query.text) 
      })
      .end((err, result) => {
        if (err || !result.hasOwnProperty('text')) {
          res.send({});
          return;
        }
        res.send(JSON.parse(result.text));
      });
  });

  router.get('/intent', (req, res) => {
    if (!req.query.hasOwnProperty('text') || req.query.text === '') {
      return res.send({});
    }

    request
      .get(INTENT_URL)
      .type('json')
      .query({ 
        sentence: encodeURI(req.query.text)
      })
      .end((err, result) => {
        if (err || !result.hasOwnProperty('text')) {
          res.send({});
          return;
        }
        res.send(JSON.parse(result.text));
      });
  });

  router.get('/NLU', (req, res) => {
    if (!req.query.hasOwnProperty('text') || req.query.text === '') {
      return res.send({});
    }

    request
      .get(NLU_URL)
      .type('json')
      .query({ 
        f : 'synonymSegment,namedEntities',
        appid : '1',
        q: encodeURI(req.query.text)
      })
      .end((err, result) => {
        if (err || !result.hasOwnProperty('text')) {
          res.send({});
          return;
        }
        res.send(JSON.parse(result.text));
      });
  });

  module.exports = router;

})()
