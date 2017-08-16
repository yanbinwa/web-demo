

// const config = require('./config');
// const filesRoutes = require('./routes/files');

(function() {
  'use strict';
  const express = require('express');
  const bodyParser = require('body-parser');
  const config = require('./config/index');
  var router = require('./router');

  var cluster = require('cluster');

  if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', function (worker) {
      console.log('Worker %d died :(', worker.id);
      cluster.fork();
    });
  } else {

    /**
     * Global Constants
     */
    const CLIENT_PATH = './client/build/';
    const PORT = config.port;
    /**
     * Main
     */
    const app = express();

    // setup static files
    app.use(express.static(CLIENT_PATH));

    // setup body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', router);

    // setup routes
    // app.use(getAPIPath(ROUTES.QUESTION), questionRoutes);
    // app.use(ROUTES.FILES, filesRoutes);

    // start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });

    return app;

    /**
     * Functions
     */
    function getAPIPath(route) {
      return `${API_PATH}${route}`;
    }
  }

})();
