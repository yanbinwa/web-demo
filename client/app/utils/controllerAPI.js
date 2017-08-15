import request from 'superagent';
//import $ from 'jquery';
//const API_URL = 'http://172.16.101.61:11180/chiq/chat';
const API_URL = '/controller';

const controllerAPI = (text, cb) => {
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

export default controllerAPI;
