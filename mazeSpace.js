"use strict";

function MageSpace(directions) {
  var i;
  for (i = 0; i < directions.length; i++) {
    this[directions[i]] = false;
  }
}

MageSpace.prototype.setWall = function (direction) {
  this[direction] = true;
};
