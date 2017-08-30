'use strict';
function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.startX = null;
  this.startY = null;
  this.startOrientation = null;
  this.endX = null;
  this.endY = null;

  this.directions = ['east','north','west','south'];
  this.spaces = [];
  var x, y;
  for (x = 0; x <= width; x++) {
    this.spaces[x] = [];
    for (y = 0; y <= height; y++) {
      this.spaces[x][y] = new MageSpace(this.directions);
    }
  }
}

Maze.prototype.setStart = function (x, y, orientation) {
  if(this.IsInBounds(x, y) && this.isValidDirection(orientation)) {
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;
    return true;
  }
  return false;
};

Maze.prototype.setEnd = function (x, y) {
  if(!this.IsInBounds(x, y)) {
    return false;
  }
  this.endX = x;
  this.endY = y;
  return true;
};

Maze.prototype.setWall = function (x, y, direction) {
  if (this.IsInBounds(x, y) && this.isValidDirection(direction)) {
    this.spaces[x][y].setWall(direction);
    return true;
  }
  return false;
}

Maze.prototype.isValidDirection = function(direction) {
  return this.directions.indexOf(direction) !== -1;
}

Maze.prototype.IsInBounds = function (x, y) {
  return x>0 && x<=this.width && y>0 && y<=this.height;
};

Maze.prototype.canMove = function (x, y, direction) {
  if(!this.isValidDirection(direction)){
    return false;
  }
  if(!this.IsInBounds(x, y)){
    return false;
  }
  var forwardX, forwardY;
  switch (direction) {
    case 'north':
        forwardX = x;
        forwardY = y+1;
        break;
    case 'east':
        forwardX = x+1;
        forwardY = y;
        break;
    case 'south':
        forwardX = x;
        forwardY = y-1;
        break;
    case 'west':
        forwardX = x-1;
        forwardY = y;
        break;
  }
  if(!this.IsInBounds(forwardX, forwardY)){
    return false;
  }

  if(this.spaces[x][y][direction]){
    return false;
  }

  var opposites = {
    north: 'south',
    east: 'west',
    south: 'north',
    west: 'east'
  };
  if(this.spaces[forwardX][forwardY][opposites[direction]]){
    return false;
  }
  return true;
}
