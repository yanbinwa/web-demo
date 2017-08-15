import request from 'superagent';
//import $ from 'jquery';
//const NLU_API_URL = 'http://172.16.101.61:13901/parse';
const NLU_API_URL = '/NLU';

const NLUAPI = (text, cb) => {
  request
    .get(NLU_API_URL)
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

export default NLUAPI;
