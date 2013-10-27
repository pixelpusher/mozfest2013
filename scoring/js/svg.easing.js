//
// svg.easing.js 0.2 - Copyright (c) 2013 Wout Fierens - Licensed under the MIT license
SVG.easing = SVG.easing || {
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
