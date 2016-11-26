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
	// scene.add(gridXZ);

	//axes
	var axes = new THREE.AxisHelper(500);
	axes.position.y = 1;
	// scene.add(axes);

	var materialArray = [];


	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_lf.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_rt.png' ) }));


	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_up.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_dn.png' ) }));

	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_ft.png' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/space/drakeq_bk.png' ) }));

	for (var i = 0; i < 6; i++)
	materialArray[i].side = THREE.BackSide;
	var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
	var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
	scene.add( skybox );




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

	windowIcosahedron.position.x = 100;
	windowIcosahedron.position.y = 100;
	windowIcosahedron.position.z = 0;

	scene.add(windowIcosahedron);
	scene.add(icosahedron);

	robo.add(sideIcosahedron, sideIcosahedron2, windowIcosahedron, icosahedron);
	// scene.add(robo);

	var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 75, 175, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0x222222} ) );
	var cylinder2 = cylinder.clone();

	cylinder.position.x = 0;
	cylinder.position.y = 0;
	cylinder.position.z = 300;
	cylinder2.position.x = 0;
	cylinder2.position.y = 0;
	cylinder2.position.z = -300;

	cylinder.rotation.x = Math.PI /2;
	cylinder2.rotateX(270*0.0174533);

	scene.add( cylinder );
	scene.add( cylinder2 );

	robo.add(cylinder, cylinder2);
	// scene.add(robo);

	var torus = new THREE.Mesh( new THREE.TorusGeometry(30, 10, 16, 100), new THREE.MeshBasicMaterial({color: 0x000000}));
	torus.rotateY(90*0.0174533);
	torus.position.x = 280;
	torus.position.y = -5;
	torus.position.z = 115;
	var torus2 = torus.clone();

	torus2.position.z *= -1;

	// clone bottom two torus
	var torus3 = torus.clone();
	var torus4 = torus2.clone();

	// set positions x axis offset
	torus3.position.x = torus4.position.x = torus.position.x-30;

	torus3.position.y = torus4.position.y = torus.position.y-200;

	torus3.position.z *= .60;
	torus4.position.z *= .60;

	scene.add(torus);
	scene.add(torus2);
	scene.add(torus3);
	scene.add(torus4);

	robo.add(torus, torus2, torus3, torus4);
	// scene.add(robo);

	var box = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300),  new THREE.MeshBasicMaterial({color: 0x222222}));
	box.position.x = 100;
	box.position.y = -100;


	scene.add(box);
	robo.add(box);


	// make a group for each arm
	// leftArmGroup, rightArmGroup = new THREE.Object3D();



	// make some groups

	armGroup = new THREE.Object3D();
	armGroup2 = new THREE.Object3D();


	armBase =  new THREE.Mesh(new THREE.IcosahedronGeometry(75, 2), new THREE.MeshBasicMaterial( {color: 0x00ffff} ));
	armBase.position.x = 200;
	armBase.position.y = -120;
	armBase.position.z = 150;
	armBase2 = armBase.clone();
	armBase2.position.z *= -1;

	// add to group
	armGroup.add(armBase);
	armGroup2.add(armBase2);
	// robo.add(armGroup, armGroup2);

	// robo.add(armBase, armBase2);

	// scene.add(armGroup, armGroup2);
	// scene.add(armBase);
	// scene.add(armBase2);

	arm = new THREE.Mesh( new THREE.CylinderGeometry( 40, 20, 150, 32 ), new THREE.MeshBasicMaterial( {color: 0x000000} ) );
	arm.position.x = 340;
	arm.position.y = -120;
	arm.position.z = 150;
	arm.rotateZ(90*.0174533);
	arm2 = arm.clone();
	arm2.position.z *=-1;

	armGroup.add(arm);
	armGroup2.add(arm2);

	// scene.add( arm );
	// scene.add( arm2 );
	// robo.add(armGroup, armGroup2);


	// scene.add(armGroup, armGroup2);


	windowRing = new THREE.Mesh(new THREE.RingGeometry(75,100, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing.position.x = 425;
	windowRing.position.y = -120;
	windowRing.position.z = 150;

	windowRing.rotation.y = (90*.0174533);

	windowRing2 = new THREE.Mesh(new THREE.RingGeometry(50,75, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing2.position.x = 475;
	windowRing2.position.y = -120;
	windowRing2.position.z = 150;
	windowRing2.rotation.y = (90*.0174533);

	windowRing3 = new THREE.Mesh(new THREE.RingGeometry(25,50, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing3.position.x = 525;
	windowRing3.position.y = -120;
	windowRing3.position.z = 150;
	windowRing3.rotation.y = (90*.0174533);

	windowRing4 = new THREE.Mesh(new THREE.RingGeometry(75,100, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing4.position.x = 425;
	windowRing4.position.y = -120;
	windowRing4.position.z = -150;

	windowRing4.rotation.y = (90*.0174533);

	windowRing5 = new THREE.Mesh(new THREE.RingGeometry(50,75, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing5.position.x = 475;
	windowRing5.position.y = -120;
	windowRing5.position.z = -150;
	windowRing5.rotation.y = (90*.0174533);

	windowRing6 = new THREE.Mesh(new THREE.RingGeometry(25,50, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	windowRing6.position.x = 525;
	windowRing6.position.y = -120;
	windowRing6.position.z = -150;
	windowRing6.rotation.y = (90*.0174533);

	armGroup.add(windowRing, windowRing2, windowRing3);
	armGroup2.add(windowRing4, windowRing5, windowRing6);

	// scene.add(armGroup, armGroup2);
	robo.add(armGroup, armGroup2);
	// scene.add(robo);

	// scene.add(windowRing, windowRing2, windowRing3);
	// scene.add(windowRing4, windowRing5, windowRing6);

	var exhaust = new THREE.Mesh( new THREE.CylinderGeometry( 75, 175, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0x222222} ) );
	exhaust.position.x = -300;
	exhaust.position.y = 0;
	exhaust.position.z = 0;
	exhaust.rotation.z = 135*0.174533;

	var exhaustPipe1 = new THREE.Mesh( new THREE.CylinderGeometry( 10, 40, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) )
	exhaustPipe1.position.x = -325;
	exhaustPipe1.position.y = 50;
	exhaustPipe1.position.z = 50;
	exhaustPipe1.rotation.z = 135*0.174533;

	var exhaustPipe2 = new THREE.Mesh( new THREE.CylinderGeometry( 10, 40, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
	exhaustPipe2.position.x = -325;
	exhaustPipe2.position.y = 50;
	exhaustPipe2.position.z = -50;
	exhaustPipe2.rotation.z = 135*0.174533;

	var exhaustPipe3 = new THREE.Mesh( new THREE.CylinderGeometry( 10, 40, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
	exhaustPipe3.position.x = -325;
	exhaustPipe3.position.y = -50;
	exhaustPipe3.position.z = 50;
	exhaustPipe3.rotation.z = 135*0.174533;

	var exhaustPipe4 = new THREE.Mesh( new THREE.CylinderGeometry( 10, 40, 100, 32 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
	exhaustPipe4.position.x = -325;
	exhaustPipe4.position.y = -50;
	exhaustPipe4.position.z = -50;
	exhaustPipe4.rotation.z = 135*0.174533;


	// scene.add(exhaust, exhaustPipe1, exhaustPipe2, exhaustPipe3, exhaustPipe4);
	robo.add(exhaust, exhaustPipe1, exhaustPipe2, exhaustPipe3, exhaustPipe4);
	// scene.add(robo);

	var treadShape = new THREE.Shape();
	treadShape.moveTo(0, 0, 0);

	treadShape.lineTo(-25, 10);
	treadShape.lineTo(-30, 30);
	treadShape.lineTo(-100, 100);

	treadShape.lineTo(100, 100);
	treadShape.lineTo(30, 30);
	treadShape.lineTo(25, 10);

	var extrudeSettings = {

		bevelEnabled : true,
		bevelSegments : 16,
		steps : 2,


	};

	var treadGeometry = new THREE.ExtrudeGeometry(treadShape, extrudeSettings);
	var treadMesh = new THREE.Mesh(treadGeometry, new THREE.MeshBasicMaterial( {color: 0x222222} ));
	treadMesh.position.x = 0;
	treadMesh.position.y = -240;
	treadMesh.position.z = 0;
	treadMesh.rotation.z = 90 * 0.174533;
	var treadMesh2 = treadMesh.clone();
	treadMesh2.rotation.y = 90 * 0.174533;
	treadMesh2.position.z -= 50;
	treadMesh.position.z += 50;
	// scene.add(treadMesh, treadMesh2);

	var roller =  new THREE.Mesh(new THREE.IcosahedronGeometry(40, 2), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	roller.position.x = 50;
	roller.position.y = -325;
	roller.position.z = 100;
	var roller2 = roller.clone();
	var roller3 =  roller.clone();
	var roller4 = roller.clone();
	roller2.position.x = roller4.position.x = roller.position.x*-1;
	roller3.position.z = roller4.position.z = roller.position.z *-1;

	// scene.add(roller, roller2, roller3, roller4);

	var curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3( -100, 0, 0 ),
		new THREE.Vector3( -50, 150, 0 ),
		new THREE.Vector3( 200, 150, 0 ),
		new THREE.Vector3( 170, 0, 0 )
	);

	geometry = new THREE.Geometry();
	geometry.vertices = curve.getPoints( 100 );
	// geometry.applyMatrix(new THREE.Matrix3...)
	geometry.scale(2, 3, 100);
	// geometry.scale(100, 100, 100);

	var material = new THREE.LineBasicMaterial( { color : 0x00ffff } );
	// var material = new THREE.BasicMaterial( { color : 0xff0000 } );

	// Create the final Object3d to add to the scene
	var curveObject = new THREE.Line( geometry, material );
	curveObject = curveObject
	curveObject.position.x = 200;
	curveObject.position.y = 300;
	curveObject.position.z = 0;
	var curveObject2 = curveObject.clone();

	curveObject2.position.y -= 1;

	var curveObject3 = curveObject.clone();
	curveObject3.position.y += 1;
	var curveObject4 = curveObject.clone();
	curveObject4.position.z += 1;
	var curveObject5 = curveObject.clone();
	curveObject5.position.z -= 1;
	var curveObject6 = curveObject.clone();
	curveObject6.position.x -= 1;
	var curveObject7 = curveObject.clone();
	curveObject7.position.x += 1;


	// scene.add(curveObject, curveObject2, curveObject3, curveObject4, curveObject4, curveObject5, curveObject6, curveObject7);
	robo.add(curveObject, curveObject2, curveObject3, curveObject4, curveObject4, curveObject5, curveObject6, curveObject7);
	// scene.add(robo);


	var dangle =  new THREE.Mesh(new THREE.IcosahedronGeometry(50, 2), new THREE.MeshBasicMaterial( {color: 0x00ffff} ));
	dangle.position.x = 525;
	dangle.position.y = 250;
	dangle.position.z = 0;

	// scene.add(dangle);

	var dangle2 =  new THREE.Mesh(new THREE.IcosahedronGeometry(25, 2), new THREE.MeshBasicMaterial( {color: 0x00ffff} ));
	dangle2.position.x = 525;
	dangle2.position.y = 200;
	dangle2.position.z = 0;

	// scene.add(dangle2);

	var dangle3 =  new THREE.Mesh(new THREE.IcosahedronGeometry(10, 2), new THREE.MeshBasicMaterial( {color: 0x00ffff} ));
	dangle3.position.x = 525;
	dangle3.position.y = 170;
	dangle3.position.z = 0;

	// scene.add(dangle3);

	robo.add(dangle, dangle2, dangle3);

	var torusArm = new THREE.Mesh(new THREE.TorusGeometry(25, 6, 16, 100), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	torusArm.position.x = 525;
	torusArm.position.y = 200;
	torusArm.position.z = 0;
	// torus.rotation.y = 90* .174533;
	// torusArm.rotation.y = 45 * 0.174533;
	torusArm.rotation.x = 45 * 0.174533;

	// scene.add(torusArm);

	var torusArm2 = new THREE.Mesh(new THREE.TorusGeometry(10, 5, 16, 100), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	torusArm2.position.x = 525;
	torusArm2.position.y = 175;
	torusArm2.position.z = 0;
	torusArm2.rotation.x = 45 * 0.174533;

	// scene.add(torusArm2);
	robo.add(torusArm, torusArm);
	// scene.add(robo);

	// lureGlow = new THREE.Mesh(new THREE.RingGeometry(75,100, 8), new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} ) );
	// lureGlow = new THREE.Mesh(new THREE.RingGeometry(75,100, 8), new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.DoubleSide} ) );
	lureGlow = new THREE.Mesh(new THREE.RingGeometry(125,175, 8), new THREE.MeshBasicMaterial( {color: 0xFFC107, side: THREE.DoubleSide} ) );
	// lureGlow = new THREE.Mesh(new THREE.RingGeometry(75,100, 8), new THREE.MeshBasicMaterial( {color: 0xFFF9C4, side: THREE.DoubleSide} ) );
	lureGlow.position.x = 525;
	lureGlow.position.y = 250;
	lureGlow.position.z = 0;
	// lureGlow.rotation.y = (90*.0174533);
	lureGlow.rotation.x = (90*.0174533);


	// scene.add(lureGlow);
	robo.add(lureGlow);
	// scene.add(robo);

	//
	// var pincer = new THREE.Mesh(new THREE.TetrahedronGeometry(20, 0), new THREE.MeshBasicMaterial( {color: 0x000000} ));
	// pincer.position.x = 540;
	// pincer.position.y = 155;
	// pincer.position.z = 0;
	// // pincer.rotation.x = -45 * .174533;
	// var pincer2 = pincer.clone();
	// // pincer.rotation.z = 135 * .174533;
	// pincer2.position.x -= 25;
	// // pincer2.rotation.z = -1*(135 * .174533);
	// scene.add(pincer, pincer2);

	var pincer = new THREE.Shape();
	pincer.moveTo(0, 0, 0);

	// pincer.lineTo(-25, 10);
	// pincer.lineTo(-30, 30);
	pincer.lineTo(-20, 20);

	pincer.lineTo(20, 20);
	// pincer.lineTo(30, 30);
	// pincer.lineTo(25, 10);

	var pincerExtrudeSettings = {
		amount : 4,
		bevelEnabled : true,
		bevelSegments : 32
		// steps : 1,
		// bevelSize : 1,
		// bevelThickness : 1
	};

	var pincerGeometry = new THREE.ExtrudeGeometry(pincer, pincerExtrudeSettings);
	var pincerMesh = new THREE.Mesh(pincerGeometry, new THREE.MeshBasicMaterial( {color: 0x000000} ));
	pincerMesh.position.x = 560;
	pincerMesh.position.y = 135;
	pincerMesh.position.z = 0;
	pincerMesh.rotation.z = 46 * .174533;
	var pincerClone = pincerMesh.clone();
	pincerClone.rotation.z = 134 * .174533;
	pincerClone.position.x -= 70;


	// scene.add(pincerMesh, pincerClone);
	robo.add(pincerMesh, pincerClone);
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
