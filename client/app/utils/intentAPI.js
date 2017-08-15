import request from 'superagent';
//import $ from 'jquery';
//const INTENT_API_URL = 'http://172.16.101.61:14399/intent';
const INTENT_API_URL = '/intent';

const intentAPI = (text, cb) => {
  request
    .get(INTENT_API_URL)
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

export default intentAPI;
