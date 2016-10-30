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
            setPWM: this.setPWM,
            setPWMServoPulseMs: this.setPWMServoPulseMs, // For servos
            setPWMFreq: this.setPWMFreq,
            stop: this.stop,
        };
    },

    connections: {
        raspi: { adaptor: 'raspi' }
    },

    devices: {
        //motor: { driver: 'motor', pin: 32 },
        //motor2: { driver: 'motor', pin: 33 }
        pca9685: { driver: 'pca9685' }
    },

    // Just for reference
    pwmLimits: {
        min: 0,
        max: 4096,
        freqMin: 40,
        freqMax: 1000,
    },

    pwmFreq: 400,

    work: function (my) {
        try {
            //this.motor.turnOff();
            //this.motor2.turnOff();

            // var min = 700;
            // var max = 1100;

            // // set the frequency to 50hz
            //my.pca9685.setPWMFreq(pwmFreq);
            my.setPWMFreq(my.pwmFreq);
            // reset and stop all outputs
            my.pca9685.stop();

            // // rotate to and hold the minium position
            // my.pca9685.setPWM(0, 0, min);

            // after((5).seconds(), function() {
            //     // rotate to and hold the maxium position
            //     my.pca9685.setPWM(0, 0, max);
            // });

            // after((10).seconds(), function() {
            //     // reset and stop all outputs
            //     my.pca9685.stop();
            // });
        }
        catch (err) {
            console.log(err);
        }
    },

    turnOn: function () {
        try {
            //this.motor.turnOn();
            console.log('turned on!');
            this.emit('turned_on', { data: 'turned_on data' });
        }
        catch (err) {
            console.log(err);
        }
    },

    turnOff: function () {
        try {
            //this.motor.turnOff();
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
        try {
            console.log(payload + " received!")
            return payload + " received!";
        }
        catch (err) {
            console.log(err);
        }  
    },

    setPWM: function (index, value) {
        try {
            if( value < this.pwmLimits.min ) { value = this.pwmLimits.min; }
            if( value > this.pwmLimits.max ) { value = this.pwmLimits.max; }
            if( index < 0 ) { index = 0; }
            if( index > 16 ) { index = 16; }

            this.pca9685.setPWM(index, 0, value);
            return "PWM for index " + index + " set to " + value;
        }
        catch (err) {
            console.log(err);
        }
    },

    //servoMin: 160, // MG90D at 50Hz
//servoMax: 490, // MG90D at 50Hz
// 50 hz
//    tick = 1000 / 50 = 20ms
//    tickfraction = 160 / 4096 = 0.04
//    ms = tick * tickfraction = 0.78

//0.8ms min
//2.4ms max

//ms = (1000 / freq) * ( pwm / 4096 )
//ms / (tick) = pwm / 4096
//ms / tick * 4096 = pwm

    setPWMServoPulseMs: function (index, ms) {
        try {
            var tickms = 1000 / this.pwmFreq;
            var pwm = ms / tickms * 4096;

            return this.setPWM(index, pwm);
        }
        catch (err) {
            console.log(err);
        }
    },

    setPWMFreq: function (value) {
        try {
            if( value < this.pwmLimits.freqMin ) { value = this.pwmLimits.freqMin; }
            if( value > this.pwmLimits.freqMax ) { value = this.pwmLimits.freqMax; }

            this.pwmFreq = value;
            this.pca9685.setPWMFreq(this.pwmFreq);
            return "PWM freq set to " + this.pwmFreq;
        }
        catch (err) {
            console.log(err);
        }
    },
    

    stop: function () {
        try {
            this.pca9685.stop();
            return "PWM stopped";
        }
        catch (err) {
            console.log(err);
        }
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
