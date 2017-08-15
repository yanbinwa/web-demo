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
    publicFiles: process.env.PUBLIC_FILES || '/usr/src/app/public_files'
  };

  /**
   * Functions
   */

})();
