//  Luxo

console.log("luxo.js")

////////////////////////////////////////////////////////////////////////
// initLuxoMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initLuxoMotions() {

      // basic interpolation test
//    myboxMotion.currTime = 0.1;
//    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=0.1
//    myboxMotion.currTime = 2.9;
//    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=2.9

    // keyframes for Luxo:    name, dt, [x, y, theta1, theta2, theta3]
    // note:  the keyframe name is arbitrary;  use this to help keep track of your own poses

    // luxoMotion.addKeyFrame(new Keyframe('straight',         0.0, [0, 0,   0, -25, 25, 0]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         0.3, [0, 0,   0, -25, 25, 0]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         1.0, [3, 8,   100, -85, 125, 20]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         1.0, [5, 8,   200, -85, 100, 40]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         1.0, [7, 0,   360, -25, 25, 0]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         0.3, [7, 0,   360, -25, 25, 0]));

    // First Jump 2.2
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.0, [-11, 1, 10,  0, -15, 25, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.2, [-11, 1, 10,  0, -45, 25, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 2, 10,  0, -65, 100, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 2, 10,  0, -75, 125, 40]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 1, 10,  0, -80, 110, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.2, [-11, 1, 10,  0, -75, 100, 0]));
    
    // First catch 2.4
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.2, [-11, 1.5, 10, 0, -75, 100, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 2, 10,  20, -55, 100, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 1.9, 10,  20, -35, 85, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         1, [-11, 1.8, 10,  20, -25, 85, 0]));

    // First kick 1.8
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 1, 10, 0,  -75, 120, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.8, [-11, 1, 10, 0, -55, 100, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-9, 2, 10, 0, -65, 110, 20]));

    // First jump 1.5
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.3, [-7.5, 2, 10, -5, -75, 120, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-7, 1.5, 10, -10, -65, 100, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-7, 1, 10, 0, -45, 70, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-5, 1.5, 10, 20, -60, 100, 20]));

    // Second kick 3
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-5, 3, 10, 60, -60, 100, 20]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         1, [-7, 9, 10, 120, -45, 80, 40]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.8, [-9, 7, 10, 240, -25, 65, 40]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.8, [-11, 1, 10, 359, -45, 80, 0]));

    // Second catch 3
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-11, 1, 10, 359.9, -45, 60, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.7, [-11, 1, 10, 359.9, -30, 40, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.7, [-11, 1, 10, 359.9, -50, 60, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.4, [-11, 1, 10, 359.9, -30, 40, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         0.8, [-14, 8, 10, 280, -40, 60, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         2.1, [-14, 1.5, 10, 359.9, -25, 40, 0]));
    luxoMotion.addKeyFrame(new Keyframe('straight',         2, [-12, 1, 10, 359.9, -40, 70, 0]));
    //luxoMotion.addKeyFrame(new Keyframe('straight',         10, [-9, 0, 358, -45, 60, 0]));
}

/////////////////////////////////////	
// initLuxo():  setup Luxo geometry
/////////////////////////////////////	

function initLuxo() {
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    jointGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 1.1, 20, 4 );

    luxo1 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo1 );
    luxo2 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo2 );
    luxo3 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo3 );
    luxo4 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo4 );
    luxoj1 = new THREE.Mesh( jointGeometry, diffuseRed);  scene.add(luxoj1);
    luxoj2 = new THREE.Mesh( jointGeometry, diffuseRed);  scene.add(luxoj2);
    luxoj3 = new THREE.Mesh( jointGeometry, diffuseRed);  scene.add(luxoj3);

    luxo1.castShadow = true;    luxo1.receiveShadow = false;
    luxo2.castShadow = true;    luxo2.receiveShadow = false;
    luxo3.castShadow = true;    luxo3.receiveShadow = false;
    luxo4.castShadow = true;    luxo4.receiveShadow = false;

    luxo1.matrixAutoUpdate = false;  
    luxo2.matrixAutoUpdate = false;  
    luxo3.matrixAutoUpdate = false;  
    luxo4.matrixAutoUpdate = false;  
    luxoj1.matrixAutoUpdate = false;  
    luxoj2.matrixAutoUpdate = false;  
    luxoj3.matrixAutoUpdate = false;  
}

///////////////////////////////////////////////////////////////////////////////////////
// updateLuxo(avars)
///////////////////////////////////////////////////////////////////////////////////////

function updateLuxo(avars) {
    var deg2rad = Math.PI/180;
    var xPosition = avars[0];
    var yPosition = avars[1];
    var zPosition = avars[2];
    var theta1 = avars[3]*deg2rad;
    var theta2 = avars[4]*deg2rad;
    var theta3 = avars[5]*deg2rad;
    var theta4 = avars[6]*deg2rad;
    var len1 = 3;  var len2 = 3;   var len3 = 3;      var len4 = 0.8;
    var width = 0.5;  var depth=1;
    var frame1 = new THREE.Matrix4();
    var frame2 = new THREE.Matrix4();
    var frame3 = new THREE.Matrix4();
    var frame4 = new THREE.Matrix4();

      ////////////// luxo1
    luxo1.matrix.identity(); 
    luxo1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,zPosition));   
    luxo1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));    
      // Frame 1 has been established
    frame1.copy(luxo1.matrix);
    luxo1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.5*width,0));   
    luxo1.matrix.multiply(new THREE.Matrix4().makeScale(len1,width,depth));    

      ////////////// luxo2
    luxo2.matrix.copy(frame1);      // start with parent frame
    luxo2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,width,0));
    luxo2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));    
      // Frame 2 has been established
    frame2.copy(luxo2.matrix);
    luxoj1.matrix.copy(frame2);
    luxoj1.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo2.matrix.copy(frame2);
    luxo2.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.5*len2,0,0));   
    luxo2.matrix.multiply(new THREE.Matrix4().makeScale(len2,width,depth));    

      ///////////////  luxo3
    luxo3.matrix.copy(frame2);
    luxo3.matrix.multiply(new THREE.Matrix4().makeTranslation(-len2,0,0));
    luxo3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));    
      // Frame 3 has been established
    frame3.copy(luxo3.matrix);
    luxoj2.matrix.copy(frame3);
    luxoj2.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo3.matrix.copy(frame3);
    luxo3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5*len3,0,0));   
    luxo3.matrix.multiply(new THREE.Matrix4().makeScale(len3,width,depth));    

      /////////////// luxo4
    luxo4.matrix.copy(frame3);
    luxo4.matrix.multiply(new THREE.Matrix4().makeTranslation(len3,0,0));
    luxo4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));    
      // Frame 4 has been established
    frame4.copy(luxo4.matrix);
    luxoj3.matrix.copy(frame4);
    luxoj3.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo4.matrix.copy(frame4);
    luxo4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*len4,0));   
    luxo4.matrix.multiply(new THREE.Matrix4().makeScale(width,len4,depth));    

    luxo1.updateMatrixWorld();
    luxo2.updateMatrixWorld();
    luxo3.updateMatrixWorld();
    luxo4.updateMatrixWorld();
}

