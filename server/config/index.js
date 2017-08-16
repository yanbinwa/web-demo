module.exports = (function() {
  const fs = require('fs');
  const path = require('path');

  'use strict';

  /**
   * Global Constants
   */
  const DOTENV_PATH = path.resolve(__dirname, '../../prod.env');
  /**
   * Main
   */
  try {
    const stat = fs.statSync(DOTENV_PATH);
    if (!stat || stat.isFile()) {
      require('dotenv')
        .config({
          path: DOTENV_PATH
        });
    }
  } catch(e) {
    // do nothing when file not exists
  }

  return {
    port: process.env.PORT || 8080,
    targetHostOrIP: process.env.TARGET_HOST_OR_IP || 'localhost',
    chiqParserPort: process.env.CHIQ_PARSER_PORT || 12404,
    commonParserPort: process.env.COMMON_PARSER_PORT || 14901,
    controllerPort: process.env.CONTROLLER_PORT || 11180,
    intentPort: process.env.INTENT_PORT || 14399,
    NLUPort: process.env.NLU_PORT || 13901,
    APPID: process.env.APPID || 1
  };

})();
