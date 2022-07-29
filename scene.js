///////// scene.js //////////////////

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	


var diffuseBlue = new THREE.MeshLambertMaterial( {color: 0xc0c0ff} );
var diffuseWhite = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseRed = new THREE.MeshLambertMaterial( {color: 0xff4040} );
var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xaf7f3f} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var yellowMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var redMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var greenMaterial = new THREE.MeshBasicMaterial( {color: 0x00f000} );
var blueMaterial = new THREE.MeshBasicMaterial( {color: 0x0000f0} );
var grayMaterial = new THREE.MeshBasicMaterial( {color: 0xa0a0a0} );

var sceneDiffuse = new THREE.TextureLoader().load('textures/Tree.png')
//var catBump = new THREE.TextureLoader().load('texture/Cat_bump.jpg')

var sceneMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    map: sceneDiffuse
});

var churchDiffuse = new THREE.TextureLoader().load('textures/church_diffuse.png')
var churchNormal = new THREE.TextureLoader().load('textures/church_normal.png')
var churchMetallic = new THREE.TextureLoader().load('textures/church_metallic.png')

var churchMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    map: churchDiffuse,
    normalMap: churchNormal,
    metalnessMap: churchMetallic
});
console.log("scene.js")

/////////////////////////////////////
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(5,20,9);
    light.castShadow = true; 
    scene.add(light);
    ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
}

/////////////////////////////////////	
// initLuxoObjects()
/////////////////////////////////////	

function initLuxoObjects() {
    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] 
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(-5,0.75,2);
    //scene.add( mcc );	

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 2, 2, 1, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(0, 0.5, -12);
    //scene.add( cylinder );

    // Soccer
    //ballGeometry = new THREE.SphereGeometry(0.7, 32, 32);    // radius, segments, segments
    //ball = new THREE.Mesh(ballGeometry, redMaterial);
    //ball.position.set(0,0.7,0);
    //scene.add(ball)

      // textured floor
    floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(2, 2);
    floorMaterial = new THREE.MeshLambertMaterial( {color: 0xcfcfcf, 
						    map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(30,30);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0.0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    floor.castShadow = false;
    floor.receiveShadow = true;

    // sphere, located at light position
    sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, yellowMaterial);
    sphere.position.set(-5,10,2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(sphere);
}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

const orbPosition = { type: 'v3', value: new THREE.Vector3(0.0, 1.0, 0.0) };

var armadilloMaterial = new THREE.ShaderMaterial({
    uniforms: {
      orbPosition: orbPosition
    },
    vertexShader: document.getElementById( 'amadilloVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'amadilloFragmentShader' ).textContent
  });

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

function initFileObjects() {
        // list of OBJ files that we want to load, and their material
    models = {     
    armadillo: {obj:"obj/armadillo.obj", mtl: armadilloMaterial, mesh: null },
// dragon:    {obj:"obj/dragon.obj", mtl: customShaderMaterial, mesh: null }
    };

    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
	onResourcesLoaded();
    }
    var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
	    var percentComplete = xhr.loaded / xhr.total * 100;
	    console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
    };
    var onError = function ( xhr ) {
    };

    // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
    for( var _key in models ){
	console.log('Key:', _key);
	(function(key){
	    var objLoader = new THREE.OBJLoader( manager );
	    objLoader.load( models[key].obj, function ( object ) {
		object.traverse( function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
			child.material = models[key].mtl;
			child.material.shading = THREE.SmoothShading;
		    }	} );
		models[key].mesh = object;
//		scene.add( object );
	    }, onProgress, onError );
	})(_key);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded(){
	
 // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
 //                             i.e., creates references to the geometry, and not full copies ]
    meshes["armadillo1"] = models.armadillo.mesh.clone();
    
    meshes["armadillo1"].position.set(13, 3.4, 3);
    meshes["armadillo1"].scale.set(0.08,0.08,0.08);
    meshes["armadillo1"].rotation.y = 3*Math.PI/4;
    //scene.add(meshes["armadillo1"])

    meshesLoaded = true;
}

function initGltfObjects() {
    let gltfLoader = new THREE.GLTFLoader();

    gltfLoader.load('./gltfs/tree1/tree1.gltf', (gltf) => {
        tree1 = gltf.scene;
        scene.add(tree1);
        tree1.position.set(-12, 5, -12);
        tree1.rotation.y = 3*Math.PI/4;
        tree1.scale.set(0.06, 0.06, 0.06);
    })

    gltfLoader.load('./gltfs/ground/ground.gltf', (gltf) => {
        ground = gltf.scene;
        scene.add(ground);
        ground.position.set(0, 1, 0);
        ground.scale.set(2, 2, 2);
    })

    gltfLoader.load('./gltfs/plant_bush/plant1.gltf', (gltf) => {
        plant1 = gltf.scene;
        scene.add(plant1);
        plant1.position.set(-7, 1, -12);
        plant1.scale.set(0.003, 0.003, 0.003);
    })

    gltfLoader.load('./gltfs/tree2/tree2.gltf', (gltf) => {
        tree2 = gltf.scene;
        scene.add(tree2);
        tree2.position.set(-5, 1, -11);
        tree2.scale.set(0.01, 0.01, 0.01);
    })

    gltfLoader.load('./gltfs/forest_house/house.gltf', (gltf) => {
        house = gltf.scene;
        scene.add(house);
        house.position.set(10, 0.5, -12);
        house.rotation.y = 3 * Math.PI/8;
        house.scale.set(150, 150, 150);
    })

    gltfLoader.load('./gltfs/soccer_goal/goal.gltf', (gltf) => {
        goal = gltf.scene;
        scene.add(goal);
        goal.position.set(4, 1, 10);
        goal.rotation.y = Math.PI;
        goal.scale.set(0.015, 0.015, 0.015);
    })

    gltfLoader.load('./gltfs/plants_kit/plant2.gltf', (gltf) => {
        plant2 = gltf.scene;
        scene.add(plant2);
        plant2.position.set(-10, 1.5, -5);
        plant2.rotation.y = Math.PI/4;
        plant2.scale.set(1.1, 1.1, 1.1);
    })

    gltfLoader.load('./gltfs/wood_branch/branch.gltf', (gltf) => {
        branch = gltf.scene;
        scene.add(branch);
        branch.position.set(12, 1.5, 5);
        branch.rotation.y = -3 * Math.PI/8;
        branch.scale.set(0.8, 0.8, 0.8);
    })

    // gltfLoader.load('./gltfs/watercolor_bird/scene.gltf', (gltf) => {
    //     bird = gltf.scene;
    //     scene.add(bird);
    //     bird.position.set(0, 0, 0);
    //     //bird.rotation.y = -3 * Math.PI/8;
    //     bird.scale.set(0.5, 0.5, 0.5);
    // })
}

/////////////////////////////////////	
// otherObjects():  these are here as examples;  
// move to initObjects() as needed
/////////////////////////////////////	

function otherObjects() {
    // custom object
    var geom = new THREE.Geometry(); 
    var v0 = new THREE.Vector3(0,0,0);
    var v1 = new THREE.Vector3(3,0,0);
    var v2 = new THREE.Vector3(0,3,0);
    var v3 = new THREE.Vector3(3,3,0);
    geom.vertices.push(v0);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
    geom.computeFaceNormals();
    customObject = new THREE.Mesh( geom, diffuseMaterial2 );
    customObject.position.set(0, 0, -2);
    scene.add(customObject);

    // mybox 
    myboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    mybox = new THREE.Mesh( myboxGeometry, diffuseMaterial );
    scene.add( mybox );

    // box
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    box = new THREE.Mesh( boxGeometry, diffuseMaterial );
    box.position.set(-4, 0, 0);
    scene.add( box );

    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] 
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(0,0,0);
    scene.add( mcc );	

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(2, 0, 0);
    scene.add( cylinder );

    // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
    coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
    cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
    cone.position.set(4, 0, 0);
    scene.add( cone);

    // torus:   parameters -- radius, diameter, radialSegments, torusSegments
    torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
    torus = new THREE.Mesh( torusGeometry, diffuseMaterial);

    torus.rotation.set(0,0,0);     // rotation about x,y,z axes
    torus.scale.set(1,2,3);
    torus.position.set(6, 0, 0);   // translation

    scene.add( torus );
}

