// // //  Luxo

// // console.log("soccor.js")

// // ////////////////////////////////////////////////////////////////////////
// // // initSoccerMotions():  setup Motion instances for each object that we wish to animate
// // ////////////////////////////////////////////////////////////////////////
function initBirdMotions() {
    soccerMotion.addKeyFrame(new Keyframe('straight',         0.0, [1, 13, 10]));
    soccerMotion.addKeyFrame(new Keyframe('straight',         5, [5, 16, 16]));
}

// /////////////////////////////////////	
// // initSoccer():  setup Luxo geometry
// /////////////////////////////////////
function initBird() {
    var birdLoader;
    gltfLoader.load('./gltfs/watercolor_bird/scene.gltf', (gltf) => {
        bird = gltf.scene;
        scene.add(bird);
        bird.scale.set(0.5, 0.5, 0.5);
        birdLoader = bird
    })

    birdLoader.castShadow = true;    birdLoader.receiveShadow = false;
    birdLoader.matrixAutoUpdate = false;  
}

// ///////////////////////////////////////////////////////////////////////////////////////
// // updateSoccer(avars)
// ///////////////////////////////////////////////////////////////////////////////////////

function updateBird(avars) {
    var xPosition = avars[0];
    var yPosition = avars[1];
    var zPosition = avars[2];

    bird.matrix.identity(); 
    bird.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,zPosition));     

    bird.updateMatrixWorld();
}