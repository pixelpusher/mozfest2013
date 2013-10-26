// scoreboard downward growing prototype using svg.js

// by Evan Raskob for gameshowhack
// https://twitter.com/evanraskob

// Note from Evan: I cut and pasted the SVG.easing code directly into
// this example instead of including it
//
// svg.easing.js 0.2 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license
SVG.easing = {
    backIn: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t);
    },
    backOut: function (e) {
        e = e - 1;
        var t = 1.70158;
        return e * e * ((t + 1) * e + t) + 1;
    },
    bounce: function (e) {
        var t = 7.5625,
            n = 2.75,
            r;
        if (e < 1 / n) {
            r = t * e * e;
        } else {
            if (e < 2 / n) {
                e -= 1.5 / n;
                r = t * e * e + .75;
            } else {
                if (e < 2.5 / n) {
                    e -= 2.25 / n;
                    r = t * e * e + .9375;
                } else {
                    e -= 2.625 / n;
                    r = t * e * e + .984375;
                }
            }
        }
        return r;
    },
    elastic: function (e) {
        if (e == !! e) return e;
        return Math.pow(2, -10 * e) * Math.sin((e - .075) * 2 * Math.PI / 0.3) + 1;
    }
};
// end SVG.easing



// create svg drawing paper
var draw = SVG('canvas');


// player scores
var scores = [0, 0, 0, 0];

var scoreGroups = [];
var scoreBoxHeight = 10;

for (var i = 0; i < scores.length; i++) {
    var scoreGroup = draw.group().attr('class', 'player-' + (i + 1));
    var vb = draw.viewbox();
    var hoffset = vb.width / scores.length * i;
    var voffset = vb.height - 24 - 20;
    
    var text = scoreGroup.text('P'+(i+1)).move(hoffset, voffset).font({ family:'arial', size: 24 }).fill({ color: '#fff' })

    scoreGroups.push(scoreGroup);
}

function addScore(playerIndex) {
    var scoreGroup = scoreGroups[playerIndex];
    var playerScore = scores[playerIndex];
    var vb = draw.viewbox();
    var boxWidth = (vb.width / scores.length) ;
    var hoffset = boxWidth * playerIndex;
    var voffset = vb.height - 24 - 20;
    var hPadding = 0.1;
    var newWidth = boxWidth - boxWidth*2*hPadding;

    scoreGroup.rect(newWidth, scoreBoxHeight)
        .move(hoffset+boxWidth*2*hPadding, vb.height)
        .animate(2000, SVG.easing.elastic)
        .move(hoffset, voffset - playerScore * scoreBoxHeight);
        //.attr({
        //    fill: '#ff0', stroke:'black'
    //});
}


addRandomScore = function() {
    var playerIndex = parseInt(Math.random() * scores.length, 10);
    scores[ playerIndex ]++;
    console.log(playerIndex);
    addScore(playerIndex);
}

window.addEventListener('click', addRandomScore);

//player1Score.animate(2000, SVG.easing.elastic)
//.attr( { height:200 } );