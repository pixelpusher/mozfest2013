ButtonBash
==========

Provides an endpoint to receive button bashes.

A johnny-five app translates button presses from the gameshow buzzers into http requests to this app. The only information passed is the id of the buzzer.

TODO:
- timestamping? Do we just use the order that bashes reach the server, or do we sync the clocks of the host machines running the button code and have them timestamp the button presses?

 