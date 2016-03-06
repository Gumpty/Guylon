'use strict';

var Cylon = require('cylon');

Cylon.robot({
    name: 'cybot',

    // These are the events that will be registered in the API
    events: ['turned_on', 'turned_off'],

    // These are the commands that will be availble in the API
    // Commands method needs to return an object with the aliases
    // to the robot methods.
    commands: function () {
        return {
            turn_on: this.turnOn,
            turn_off: this.turnOff,
            toggle: this.toggle,
            echo: this.echo,
        };
    },

    connections: {
        raspi: { adaptor: 'raspi' }
    },

    devices: {
        motor: { driver: 'motor', pin: 32 },
        motor2: { driver: 'motor', pin: 33 }
    },

    work: function () {
        try {
            this.motor.turnOff();
            this.motor2.turnOff();
        }
        catch (err) {
            console.log(err);
        }
    },

    turnOn: function () {
        try {
            this.motor.turnOn();
            console.log('turned on!');
            this.emit('turned_on', { data: 'turned_on data' });
        }
        catch (err) {
            console.log(err);
        }
    },

    turnOff: function () {
        try {
            this.motor.turnOff();
            console.log('turned off!');
            this.emit('turned_off', { data: 'turned_off data' });
        }
        catch (err) {
            console.log(err);
        }
    },

    toggle: function () {
        try {
            this.motor.toggle();
        }
        catch (err) {
            console.log(err);
        }
    },
    
    echo: function (payload) {
      return payload + " received!";  
    }
});

// ensure you install the API plugin first:
// $ npm install cylon-api-socket-io
Cylon.api(
    'socketio',
    {
        host: '0.0.0.0',
        port: '3000'
    });

Cylon.start();
