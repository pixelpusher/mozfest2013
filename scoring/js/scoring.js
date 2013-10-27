// scoreboard downward growing prototype using svg.js

// by Evan Raskob for gameshowhack
// https://twitter.com/evanraskob


//
// Global vars
//

// create svg drawing paper
var draw;
var MAX_PLAYERS = 4;
// player scores
var scores = [];
var scoreGroups;
var scoreBoxHeight = 60;


//
// get the score for a player (0 - MAX_PLAYERS)
//
function getPlayerScore(playerIndex)
{
	if ( playerIndex < scores.length )
		return scores[playerIndex];
	else
		return -1; // error!
}

//
// init everything
//
function initCanvas()
{
	// create svg drawing paper
	draw = SVG('canvas');
	
	
	// player scores - init to 0
	for (var i=0; i<MAX_PLAYERS; i++)
		scores.push(0);
	
	
	scoreGroups = [];
	
	for (var i = 0; i < scores.length; i++) {
		var vb = draw.viewbox();
		var boxWidth = vb.width / scores.length;
		var hoffset = boxWidth * i;
		var voffset = vb.height - 24 - 20;
		var hPadding = 0.1;
		

		var scoreGroup = draw.group().attr('class', 'player-' + (i + 1));
		var scoreColumn = scoreGroup.rect(boxWidth-2*hPadding*boxWidth, vb.height).attr('class', 'score-column') 
			.move(hoffset+boxWidth*hPadding,0);
		
		var t = scoreGroup.text('P' + (i + 1))
			.move(hoffset+boxWidth/2-boxWidth*hPadding, voffset)
			.font({
				family: 'arial',
				size: 24
				})
			.fill({
				color: '#000',	
			})
			.stroke('none')
			.animate(2500, '>', 500)
			.fill({
				color: '#fff'
			});
		
		// doesn't work
		/*
		scoreGroup.data('key', {
			value: {
				data: i
			}
		})
		scoreGroup.on('click', function () {
			addScore(this.data('key'));
		});
		*/
		
		scoreGroup.boxes = [];	// this will contain the scoreboxes so we can remove them later
		scoreGroups.push(scoreGroup);
	}
	
	
	// add points scoring handlers to buttons
	document.getElementById('p1').addEventListener('click', function () {
		addScore(0);
	});
	document.getElementById('p2').addEventListener('click', function () {
		addScore(1);
	});
	document.getElementById('p3').addEventListener('click', function () {
		addScore(2);
	});
	document.getElementById('p4').addEventListener('click', function () {
		addScore(3);
	});
	
	// add points scoring handlers to buttons
	document.getElementById('p1r').addEventListener('click', function () {
		removeScore(0);
	});
	document.getElementById('p2r').addEventListener('click', function () {
		removeScore(1);
	});
	document.getElementById('p3r').addEventListener('click', function () {
		removeScore(2);
	});
	document.getElementById('p4r').addEventListener('click', function () {
		removeScore(3);
	});			
}


//
// add a point to a player (0 - MAX_PLAYERS)
//
function addScore(playerIndex) {

    scores[playerIndex]++;

    var scoreGroup = scoreGroups[playerIndex];
    var playerScore = scores[playerIndex];
    var vb = draw.viewbox();
    var boxWidth = (vb.width / scores.length);
    var hoffset = boxWidth * playerIndex;
    var voffset = vb.height - 24 - 20;
    var hPadding = 0.1;
    var newWidth = boxWidth - boxWidth * 2 * hPadding;

    var scoreBox = scoreGroup.rect(newWidth, scoreBoxHeight);
    
    scoreBox.attr({opacity: 0})
        .move(hoffset + boxWidth * hPadding, vb.height)
        .animate(800, SVG.easing.elastic)
        .attr({opacity: 1})
        .move(hoffset + boxWidth * hPadding, voffset - playerScore * scoreBoxHeight);
    
    // keep reference to this scorebox element for later
    scoreGroup.boxes.push(scoreBox);
}

//
// remove a point from a player (0 - MAX_PLAYERS)
//
function removeScore(playerIndex) {
	var vb = draw.viewbox();
    var boxWidth = (vb.width / scores.length);
    var hoffset = boxWidth * playerIndex;
    var voffset = vb.height - 24 - 20;
    var hPadding = 0.1;

    scores[playerIndex]--;
    if (scores[playerIndex] < 0) scores[playerIndex] = 0;

    var scoreGroup = scoreGroups[playerIndex];
    if (scoreGroup.boxes.length > 0)
    {
    	//remove last box
    	var box = scoreGroup.boxes.pop();
    	box.animate(800, '<')
        .attr({opacity: 0})
        .move(hoffset + boxWidth * hPadding, voffset)
        .after(function() { this.remove(); });
//    	box.remove();
    }
}

//
// for testing
function addRandomScore() {
    var playerIndex = parseInt(Math.random() * scores.length, 10);
    //console.log(playerIndex);
    addScore(playerIndex);
}

//
// start it up!
//
window.addEventListener('load', initCanvas);

//test
//window.addEventListener('click', addRandomScore);
