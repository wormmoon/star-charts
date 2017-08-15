
//----------------------------------------------------------------------------------------------------------
//   FUNCTIONS
//----------------------------------------------------------------------------------------------------------

//   INTERSECTION MATHS FUNCTION

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    }

    if (x1>=x2) {
        if (!(x2<=x&&x<=x1)) {return false;}
    } else {
        if (!(x1<=x&&x<=x2)) {return false;}
    }
    if (y1>=y2) {
        if (!(y2<=y&&y<=y1)) {return false;}
    } else {
        if (!(y1<=y&&y<=y2)) {return false;}
    }
    if (x3>=x4) {
        if (!(x4<=x&&x<=x3)) {return false;}
    } else {
        if (!(x3<=x&&x<=x4)) {return false;}
    }
    if (y3>=y4) {
        if (!(y4<=y&&y<=y3)) {return false;}
    } else {
        if (!(y3<=y&&y<=y4)) {return false;}
    }
   
    return true;
}


//----------------------------------------------------------------------------------------------------------
//   OBJECTS
//----------------------------------------------------------------------------------------------------------


// POINT

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.clone = function() {
    return new Point(this.x, this.y);
}


//   VECTOR

// we're taking the line between two stars and normalising its vector to calculate the gaps desired at each end of the line when drawn
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.multiply = function(factor) {
    this.x *= factor;
    this.y *= factor;
};

Vector.prototype.getMagnitude = function() {
    return Math.sqrt((this.x*this.x) + (this.y*this.y));
};

Vector.prototype.normalise = function() {
    var m = this.getMagnitude();
    if (m>0) {
        this.x /= m;
        this.y /= m;
    }
};

Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
};