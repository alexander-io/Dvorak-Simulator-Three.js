////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window  */
var camera, scene, renderer;
var cameraControls;
// var lureGlow;
var controls;
var gui;
var keyBoard;
// var windowRing, windowRing2, windowRing3, windowRing4, windowRing5, windowRing6;
// var leftArmGroup, rightArmGroup;
// var armGroup, armGroup2;
// var armBase, armBase2, arm, arm2;

// var robo;

var keyboard = new KeyboardState();

var clock = new THREE.Clock();

function fillScene() {
	scene = new THREE.Scene();
	// scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
	// scene.fog = new THREE.Fog( 0xffffff, 2000, 4000 );

	// LIGHTS

	scene.add( new THREE.AmbientLight( 0x222222 ) );

	var light = new THREE.DirectionalLight( 0x000000, 0.7 );
	light.position.set( 200, 500, 500 );

	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff, 0.9 );
	light.position.set( -200, 100, 0 );

	scene.add( light );

	// var spotLight = new THREE.SpotLight( 0xffffff );
	// spotLight.position.set( 0, 500, 0 );
	//
	// spotLight.castShadow = true;
	//
	// spotLight.shadow.mapSize.width = 1024;
	// spotLight.shadow.mapSize.height = 1024;
	//
	// spotLight.shadow.camera.near = 500;
	// spotLight.shadow.camera.far = 4000;
	// spotLight.shadow.camera.fov = 30;
	//
	// scene.add( spotLight );


	//grid xz
	var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
	scene.add(gridXZ);

	//axes
	var axes = new THREE.AxisHelper(500);
	axes.position.y = 1;
	scene.add(axes);

	// ||||||||||||| SKYBOX |||||||||||||
	// var materialArray = [];
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_lf.png' ) }));
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_rt.png' ) }));
	//
	//
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_up.png' ) }));
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_dn.png' ) }));
	//
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_ft.png' ) }));
	// materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_bk.png' ) }));
	//
	// for (var i = 0; i < 6; i++)
	// materialArray[i].side = THREE.BackSide;
	// var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
	// var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
	// var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
	// scene.add( skybox );




	drawKeyboard();
}

function drawKeyboard() {


	robo = new THREE.Object3D();

	//////////////////////////////
	// MATERIALS

	// MODELS
	var geometry = new THREE.CylinderGeometry( 40, 20, 150, 32 );


	var material = new THREE.MeshPhongMaterial( {
	    color: 0xffffff,
			// alphaMap : 0x0f0f0f0f,
		  // alpha: 0x0f0f0f0f,
	    specular: 0x050505,

	    shininess: 1000
	} ) ;

	var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 40, 20, 150, 32 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
	var cylClone = cylinder.clone()
	cylinder.position.x = 100;
	cylinder.position.y = 75;
	cylinder.position.z = 0;
	cylClone.position.x = -100;
	cylClone.position.y = 75;
	cylClone.position.z = 0;






	var icosahedronGeometry = new THREE.IcosahedronGeometry(300, 2);
	var icosahedron = new THREE.Mesh(icosahedronGeometry, material);
	windowIcosahedron =  new THREE.Mesh(new THREE.IcosahedronGeometry(170, 2), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	var sideIcosahedron =  new THREE.Mesh(new THREE.IcosahedronGeometry(50, 2), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	var sideIcosahedron2 = sideIcosahedron.clone();
	sideIcosahedron.position.x = 00;
	sideIcosahedron2.position.x = 0;
	sideIcosahedron.position.y = 0;
	sideIcosahedron2.position.y = 0;
	sideIcosahedron.position.z =  325;
	sideIcosahedron2.position.z = -325;

	scene.add(sideIcosahedron);
	scene.add(sideIcosahedron2);


	scene.add(robo);

}


function init() {
	var canvasWidth = 1000;
	var canvasHeight = 600;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	// gui CONTROLS
	controls = new function(){
		this.keyboardRotationX = 0.00;
		// this.rotationSpeedX = 0.00;
		// this.rotationSpeedY = 0.01;
		// this.rotationSpeedZ = 0.01;
		// this.leftTurretRotation = 0.01;
		// this.rightTurretRotation = 0.01;
		// this.armRotation = 0.0;
		// this.armRotation2 = 0.0;
	}

	gui = new dat.GUI();
	gui.add(controls, 'keyboardRotationX', 0, 0.5)
	// gui.add(controls, 'rotationSpeedX', 0, 0.5);
	// gui.add(controls, 'rotationSpeedY', 0, 0.5);
	// gui.add(controls, 'rotationSpeedZ', 0, 0.5);
	// gui.add(controls, 'leftTurretRotation', 0, 0.5);
	// gui.add(controls, 'rightTurretRotation', 0, 0.5);
	// gui.add(controls, 'armRotation', -1.0, 1.0);
	// gui.add(controls, 'armRotation2', -1.0, 1.0);

	// renderScene();

	// function renderScene(){
	// 	// lureGlow.rotation.x += controls.rotationSpeedX;
	// 	// lureGlow.rotation.y += controls.rotationSpeedY;
	// 	// lureGlow.rotation.z += controls.rotationSpeedZ;
	// }
	//
	// requestAnimationFrame(renderScene);

	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 16000 );

	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -800, 600, -500);
	cameraControls.target.set(4,301,92);
}

function addToDOM() {
	var canvas = document.getElementById('canvas');
	canvas.appendChild(renderer.domElement);
}

function animate() {
	renderScene();
	function renderScene(){
		// lureGlow.rotation.x += controls.rotationSpeedX;
		// lureGlow.rotation.y += controls.rotationSpeedY;
		// lureGlow.rotation.z += controls.rotationSpeedZ;

		// windowRing.rotation.x = windowRing2.rotation.x = windowRing3.rotation.x = controls.leftTurretRotation;
		// windowRing4.rotation.x = windowRing5.rotation.x = windowRing6.rotation.x = controls.rightTurretRotation;

		// windowRing.rotation.x = windowRing2.rotation.x = windowRing3.rotation.x += controls.leftTurretRotation;
		// windowRing4.rotation.x = windowRing5.rotation.x = windowRing6.rotation.x -= controls.rightTurretRotation;
		//
		// armGroup.rotation.z = controls.armRotation;
		// armGroup.rotation.z = controls.armRotation;

		// armGroup2.rotation.z = controls.armRotation2;
		//
		// keyboard.update();
		//
		// if (keyboard.pressed("A"))
		// {
		// 	controls.armRotation += 0.1;
		// 	controls.armRotation2 -= 0.1;
		// }
		// if (keyboard.pressed("S"))
		// {
		// 	controls.leftTurretRotation += 0.05;
		// 	controls.rightTurretRotation += 0.05;
		//
		// }
		// if (keyboard.down("D"))
		// {
		// 	controls.leftTurretRotation -= 0.05;
		// 	controls.rightTurretRotation -= 0.05;
		// }
		// if(keyboard.pressed("T"))
		// {
		// 	robo.position.x += 5.0;
		// }
		// if(keyboard.pressed("G"))
		// {
		// 	robo.position.x -= 5.0;
		// }
		// if(keyboard.pressed("F"))
		// {
		// 	robo.rotation.y += 0.015;
		// }
		// if(keyboard.pressed("H"))
		// {
		// 	robo.rotation.y -= 0.015;
		// }
	}

	requestAnimationFrame(renderScene);


	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene, camera);
}

try {
	init();
	fillScene();
	addToDOM();
	animate();
} catch(error) {
	console.log("Your program encountered an unrecoverable error, can not draw on canvas. Error was:");
	console.log(error);
}
