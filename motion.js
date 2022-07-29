////////////////////////////////////////////////////////////
// Keyframe   and   Motion  classes
////////////////////////////////////////////////////////////

class Keyframe {
   constructor(name,dt,avars,time=0.0) {
       this.name = name;
       this.dt = dt;                 // time since last keyframe
       this.avars = avars;           // animation variables
       this.time = time;             // absolute time of keyframe;  to be computed later
   };
}

class Motion {
    constructor(setMatricesFunc) {
	this.keyFrameArray = [];          // list of keyframes
	this.maxTime = 0.0;               // time of last keyframe
	this.currTime = 0.0;              // current playback time
	this.updateMatrices = setMatricesFunc;    // function to call to update transformation matrices
    };
    reset() {                     // go back to first keyframe
	this.currTime = 0.0;
    };
    addKeyFrame(keyframe) {               // add a new keyframe at end of list
	this.keyFrameArray.push(keyframe);
	this.maxTime += keyframe.dt;
	keyframe.time = this.maxTime;
    };
    print() {
	var nKF = this.keyFrameArray.length;
	for (var n=0; n<nKF; n++) {
	    console.log("Keyframe ",n, this.keyFrameArray[n]);
	}
    };
    timestep(dt) {                //  take a time-step
	this.currTime += dt;
	if (this.currTime > this.maxTime)  // loop to beginning if beyond end
	    this.currTime = 0;     
	if (this.currTime < 0.0)           // loop to end if beyond beginning (for negative dt)
	    this.currTime = this.maxTime;
//	var avars = this.getAvarsLinear();
	var avars = this.getAvarsSpline();
	this.updateMatrices(avars);
    };

    genMotionCurves(dt) {
	var curvePts = [];
	for (var t=0; t<this.maxTime; t+=dt) {
	    this.currTime = t;
//	    var avars = this.getAvarsLinear();
	    var avars = this.getAvarsSpline();
	    curvePts.push(avars);
	}
//	console.log(curvePts);
	return curvePts;
    };

    getAvarsSpline() {       // Catmull-Rom spline interpolation across multiple segments
		var Mh = new THREE.Matrix4();     // hermite basis matrix
		Mh.set( 2, -2, 1, 1,        // set using row-major ordering
		   -3, 3, -2, -1,
		   0, 0, 1, 0,
		   1, 0, 0, 0 );
		var i = 1;      // begin with the first curve segment
		var eps=0.001;
	//	console.log("currTime=",this.currTime);
		while (this.currTime > this.keyFrameArray[i].time)      // find the right pair of keyframes
			i++;
		var avars = [];  									// Create an empty list for output values
		var nKF = this.keyFrameArray.length; 				// Get the number of keyframes
	
		// Use for loop to interplate each animation varible between keyFrameArray[i-1] and keyFrameArray[i]
		for (var n=0; n<this.keyFrameArray[i-1].avars.length; n++) {  
			// compute point indices
			// Calculate the curve segment between keyFrameArray[i-1] and keyFrameArray[i] using four control points (i-2, i-1, i, i+1)
			var i1 = i-2;  if (i1<0) i1=0;       			// Let i-2 be the first control point. If i-1 is the end point (the first key frame), i-2 < 0. We repeat end points
			var kf1 = this.keyFrameArray[i1];				// to deal with, which is to set i1 to be 0
	
			var i2 = i-1;									// Let i-1 be the second control point
			var kf2 = this.keyFrameArray[i2];
	
			var i3 = i;										// Let i be the third control point
			var kf3 = this.keyFrameArray[i3];
	
			var i4 = i+1;  if (i4>nKF-1) i4=nKF-1;  		// Let i+1 be the forth control point. If i is the end point (the last key frame), i+1 > nKF-1. We repeat end points
			var kf4 = this.keyFrameArray[i4];				// to deal with, which is to set i4 to be nKF - 1
			
			var y1 = kf1.avars[n],  t1 = kf1.time;			// Get the time t and corresponding nth animation variable y for each key frame
			var y2 = kf2.avars[n],  t2 = kf2.time;			//
			var y3 = kf3.avars[n],  t3 = kf3.time;			//
			var y4 = kf4.avars[n],  t4 = kf4.time;			//
	
			var y2p = (t3-t2)*(y3-y1)/(t3-t1);				// Calculate the tangent of the second and third control points
			var y3p = (t3-t2)*(y4-y2)/(t4-t2);				//
	
			var t = (this.currTime - t2)/(t3-t2);			// Calculate the corret t in this curve for current time
			var T = new THREE.Vector4( t*t*t, t*t, t, 1 );	// Create T vector
			var G = new THREE.Vector4(y2,y3,y2p,y3p); 		// Create the hermite geometry vector
			var A = G.applyMatrix4(Mh);						// Get the matrix A by multiplying hermite basis matrix Mh and hermite geometry vector G
			var val = T.dot(A);								// Get the interpolation value for current time by multiplying T and A
			avars.push(val);								// Put the value in the list of 
		}
		return avars; 										// Return a list of interpolation values of current time for each animation variable
		};
		// This interpolation deals with variable-spacing in a similar way as cases of evenly spaced keyframes. One difference is that it considers the difference in
		// time interval when calculating the tangent of the second and third control points. Instead of simply putting (y3-y1)/2 or (y4-y2)/2, it uses (t3-t2) / (t3-t1) and
		// (t3 - t2) / (t4 - t2) to replace the 1/2. These formulas will yield 1/2 if we have evenly spaced keyframes so they work well for all the cases. Another minor point
		// is that it uses t = (this.currTime - t2)/(t3-t2) to calculate the corresponding t of current time in t2 to t3 interval.

    getAvarsLinear() {        // linear interpolation of values
	var i = 1;      // begin with the first curve segment
	while (this.currTime > this.keyFrameArray[i].time)      // find the right pair of keyframes
	    i++;
	var avars = [];
	for (var n=0; n<this.keyFrameArray[i-1].avars.length; n++) {   // interpolate the values
	    var y0 = this.keyFrameArray[i-1].avars[n];
	    var y1 = this.keyFrameArray[i].avars[n];
	    var x0 = this.keyFrameArray[i-1].time;
	    var x1 = this.keyFrameArray[i].time;
	    var x = this.currTime;
	    var y = y0 + (y1-y0)*(x-x0)/(x1-x0);    // linearly interpolate
	    avars.push(y);
	}
	return avars;         // return list of interpolated avars
    };
}

