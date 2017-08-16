(function() {
  var express = require('express');
  var router = express.Router();
  const config = require('./config/index');
  const request = require('superagent');
  const async = require('async');

  const TARGET_HOST = config.targetHostOrIP;
  const CHIQ_PARSER_PORT = config.chiqParserPort;
  const COMMON_PARSER_PORT = config.commonParserPort;
  const CONTROLLER_PORT = config.controllerPort;
  const INTENT_PORT = config.intentPort;
  const NLU_PORT = config.NLUPort;
  const APPID = config.APPID;

  const CHIQ_PARSER_BASE_URL = 'http://' + TARGET_HOST + ":" + CHIQ_PARSER_PORT;
  const CHIQ_PARSER_VIDEO_URL = CHIQ_PARSER_BASE_URL + "/video-parser";
  const CHIQ_PARSER_TV_URL = CHIQ_PARSER_BASE_URL + "/tv-parser";
  const CHIQ_PARSER_TV_ADJUST_URL = CHIQ_PARSER_TV_URL + "?method=tv_set_adjust";
  const CHIQ_PARSER_TV_OPERA_URL = CHIQ_PARSER_TV_URL + "?method=tv_opera";
  const CHIQ_PARSER_APP_URL = CHIQ_PARSER_BASE_URL + "/app-parser";
  const CHIQ_PARSER_MUSIC_URL = CHIQ_PARSER_BASE_URL + "/music-parser";
  const CHIQ_PARSER_OTHER_URL = CHIQ_PARSER_BASE_URL + "/other-parser";

  const COMMON_PARSER_URL = 'http://' + TARGET_HOST + ':' +  COMMON_PARSER_PORT +'/common-parser-service';
  const CONTROLLER_URL = 'http://' + TARGET_HOST + ':' + CONTROLLER_PORT +'/chiq/chat';
  const INTENT_URL = 'http://' + TARGET_HOST + ':' + INTENT_PORT + '/intent';
  const NLU_URL = 'http://' + TARGET_HOST + ':' + NLU_PORT + '/parse';

  router.use(function timeLog(req, res, next) {
    next();
  });

  router.get('/chiqParser', (req, res) => {
    if (!req.query.hasOwnProperty('text') || req.query.text === '') {
      return res.send({});
    }
    var requests = {
      videoParser: (cb) => {
        request
          .post(CHIQ_PARSER_VIDEO_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      },
      tvAdjustParser: (cb) => {
        request
          .post(CHIQ_PARSER_TV_ADJUST_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      },
      tvOperaParser: (cb) => {
        request
          .post(CHIQ_PARSER_TV_OPERA_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      },
      appParser: (cb) => {
        request
          .post(CHIQ_PARSER_APP_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      },
      musicParser: (cb) => {
        request
          .post(CHIQ_PARSER_MUSIC_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      },
      otherParser: (cb) => {
        request
          .post(CHIQ_PARSER_OTHER_URL)
          .type('json')
          .send({ 
            text: req.query.text
          })
          .end((err, result) => {
            if (err || !result.hasOwnProperty('text')) {
              cb(null, {});
              return;
            }
            var body = JSON.parse(result.text);
            cb(null, body);
          });
      }
    };
    async.parallel(requests, function(err, results) {
      var output = {};
      //videoParser
      var result = results.videoParser;
      if (typeof result !== 'undefined') {
        output['videoParser'] = result;
      }
      else {
        output['videoParser'] = {};
      }
      //tvAdjustParser
      result = results.tvAdjustParser;
      if (typeof result !== 'undefined') {
        output['tvAdjustParser'] = result;
      }
      else {
        output['tvAdjustParser'] = {};
      }
      //tvOperaParser
      result = results.tvOperaParser;
      if (typeof result !== 'undefined') {
        output['tvOperaParser'] = result;
      }
      else {
        output['tvOperaParser'] = {};
      }
      //appParser
      result = results.appParser;
      if (typeof result !== 'undefined') {
        output['appParser'] = result;
      }
      else {
        output['appParser'] = {};
      }
      //musicParser
      result = results.musicParser;
      if (typeof result !== 'undefined') {
        output['musicParser'] = result;
      }
      else {
        output['musicParser'] = {};
      }
      //otherParser
      result = results.otherParser;
      if (typeof result !== 'undefined') {
        output['otherParser'] = result;
      }
      else {
        output['otherParser'] = {};
      }
      res.send(output);
    });
  });

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
        appid : APPID,
        q: req.query.text
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
