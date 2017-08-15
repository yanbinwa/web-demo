import request from 'superagent';
//import $ from 'jquery';
//const API_URL = 'http://172.16.101.61:14901/common-parser-service';
const API_URL = '/commonParser';

const commonParserAPI = (text, cb) => {
  request
    .get(API_URL)
    .query({
      text: text
    })
    .end((err, res) => {
      if (err || !res.hasOwnProperty('text')) {
        return cb({});
      }
      cb(JSON.parse(res.text));
    })
};

export default commonParserAPI;
