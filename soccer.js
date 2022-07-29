// // //  Luxo

// // console.log("soccor.js")

// // ////////////////////////////////////////////////////////////////////////
// // // initSoccerMotions():  setup Motion instances for each object that we wish to animate
// // ////////////////////////////////////////////////////////////////////////
function initSoccerMotions() {
    // First catch  4.7
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.0, [1, 13, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         1.5, [1, 13, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.8, [-4, 11, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.6, [-8.2, 7, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.4, [-11.5, 4.2, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.4, [-12, 3.7, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         1, [-12.5, 3.3, 10]));

    // First kick  3.2
    soccerMotion.addKeyFrame(new Keyframe('straight',         1.2, [-7, 5.7, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         1.5, [-4, 2, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.5, [-4, 3, 10]));

    // Second kick  3.1
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.6, [-6, 9, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.9, [-10, 12, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         1.0, [-11, 8, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.6, [-11, 6, 10]));

    // Second catch 2.4
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.4, [-11.3, 5, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.3, [-11.7, 4.5, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.7, [-11.7, 4.4, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         1.0, [-10.7, 10, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.6, [-10.7, 9, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         2, [6, 1.9, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         2, [6.3, 1.8, 10]));
}

// /////////////////////////////////////	
// // initSoccer():  setup Luxo geometry
// /////////////////////////////////////	
function initSoccer() {
    texture = new THREE.TextureLoader().load( "images/soccer.jpeg" );
    textureMaterial = new THREE.MeshBasicMaterial( { map: texture } );

    ballGeometry = new THREE.SphereGeometry(0.7, 32, 32);    // radius, segments, segments
    ball = new THREE.Mesh(ballGeometry, textureMaterial);
    scene.add(ball)

    ball.castShadow = true;    ball.receiveShadow = false;
    ball.matrixAutoUpdate = false;  
}

// ///////////////////////////////////////////////////////////////////////////////////////
// // updateSoccer(avars)
// ///////////////////////////////////////////////////////////////////////////////////////

function updateSoccer(avars) {
    var xPosition = avars[0];
    var yPosition = avars[1];
    var zPosition = avars[2];

    ball.matrix.identity(); 
    ball.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,zPosition));     

    ball.updateMatrixWorld();
}