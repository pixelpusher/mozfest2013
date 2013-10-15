var five  = require("johnny-five");
var http = require("http");

var board = new five.Board();
var led;
var buttonId = process.argv[2] || 1;  // game player ID if you are playing a game

console.log("started with player id = " + buttonId);


board.on("ready", function() {
	led = new five.Led(13);
  	var  button = new five.Button(2);

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
	console.log("down");

	   http.get("http://buttonbash.meteor.com?id="+buttonId, function(req) 
	   {
	   		// set encoding so this comes out as text instead of goop
	    	req.setEncoding('utf8');
	    	
			req.on("data", function(data) 
			{ 
					console.log(data);
					// flash LED 	
					led.strobe(200);
					// set LED to turn off in 2 secs 
					setTimeout( function() {
						led.off();
					}, 2000);
			});
		
			req.on("error", console.error);
		
		});
  });
  
  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
});
