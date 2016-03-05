'use strict';

var Cylon = require('cylon');

Cylon.robot({
  name: 'guybot',

  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    pca9685: { driver: 'pca9685' }
  },

  work: function() {
    // for this example with sockets
    // we are going to be interacting
    // with the robot using the code in
    // ./**-client.html
  }
});

// ensure you install the API plugin first:
// $ npm install cylon-api-socket-io
Cylon.api('socketio',
{
  host: '0.0.0.0',
  port: '3000'
});

Cylon.start();
