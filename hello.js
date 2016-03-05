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

  events: ['turned_on', 'turned_off'],

  // These are the commands that will be availble in the API
  // Commands method needs to return an object with the aliases
  // to the robot methods.
  commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff,
      toggle: this.toggle
    };
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
