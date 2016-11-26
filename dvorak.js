////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window  */
var camera, scene, renderer;
var cameraControls;
// var lureGlow;
var controls;
var gui;
var keyBoard;
var space, one, two, three, four, five, six, seven, eight, nine, zero;
var q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m;
var colon
// set key-travel-distance, abbreviated 'ktd' to determine how much the keys move
const ktd = 5;
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

	var dvorakImg = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/dvorak.png')})
	// var cube = new THREE.Mesh(new THREE.BoxBufferGeometry(270,200,800), new THREE.MeshBasicMaterial({color: 0x00ff00}))
	var cube = new THREE.Mesh(new THREE.BoxBufferGeometry(270,200,800), dvorakImg)
	cube.rotation.z = 90*(Math.PI/180)
	cube.rotation.y = 180*(Math.PI/180)
	// scene.add(cube)

	let ctrlKey = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,75), new THREE.MeshBasicMaterial({color: 0xD500F9}))
	ctrlKey.position.y = 150
	ctrlKey.position.z = 360
	ctrlKey.position.x = -80
	let ctrlKey2 = ctrlKey.clone()
	ctrlKey2.position.z = ctrlKey.position.z*-1
	scene.add(ctrlKey, ctrlKey2)

	let shiftKey = new THREE.Mesh(new THREE.BoxBufferGeometry(38,20, 140), new THREE.MeshBasicMaterial({color: 0xFF1744}))
	let shiftKey2 = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20, 116), new THREE.MeshBasicMaterial({color: 0xFF1744}))
	shiftKey.position.y = 150
	shiftKey.position.z = 327
	shiftKey.position.x = -40

	shiftKey2.position.y = 150
	shiftKey2.position.z = -340
	shiftKey2.position.x = -40
	// shiftKey2 = shiftKey.clone()
	// shiftKey2.position.z = shiftKey.position.z*-1
	scene.add(shiftKey, shiftKey2)


	let macKey = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE040FB}))
	macKey.position.y = 150
	macKey.position.z = 240
	macKey.position.x = -80
	let macKey2 = macKey.clone()
	// macKey2.position.z = macKey.position.z*-1
	macKey2.position.z = -295
	scene.add(macKey, macKey2)

	let altKey = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,80), new THREE.MeshBasicMaterial({color: 0xEA80FC}))
	altKey.position.y = 150
	altKey.position.z = 175
	altKey.position.x = -80
	let altKey2 = altKey.clone()
	// altKey2.position.z = altKey.position.z*-1
	altKey2.position.z = -225
	scene.add(altKey, altKey2)

	var spaceMap = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/spaceMap.png')})
	// let space = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,315), new THREE.MeshBasicMaterial({color: 0x673AB7}))
	space = new THREE.Mesh(new THREE.BoxBufferGeometry(20,40,315), spaceMap)
	space.position.y = 150
	space.position.z = -25
	space.position.x = -80
	space.rotation.z = 90*(Math.PI/180)
	scene.add(space);

	let tilde = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x000000}))
	tilde.position.y = 150
	tilde.position.z = -373
	tilde.position.x = 80
	scene.add(tilde);
	let keyArray = []

	one = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	one.position.y = 150
	one.position.z = -320
	one.position.x = 80
	scene.add(one);

	two = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	two.position.y = 150
	two.position.z = -267
	two.position.x = 80
	scene.add(two);


	three = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xA5D6A7}))
	three.position.y = 150
	three.position.z = -213
	three.position.x = 80
	scene.add(three);

	four = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x81C784}))
	four.position.y = 150
	four.position.z = -159
	four.position.x = 80
	scene.add(four);

	five = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x66BB6A}))
	five.position.y = 150
	five.position.z = -106
	five.position.x = 80
	scene.add(five);

	six = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x4CAF50}))
	six.position.y = 150
	six.position.z = -53
	six.position.x = 80
	scene.add(six);


	seven = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x43A047}))
	seven.position.y = 150
	seven.position.z = 0
	seven.position.x = 80
	scene.add(seven);

	eight = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x388E3C}))
	eight.position.y = 150
	eight.position.z = 53
	eight.position.x = 80
	scene.add(eight);

	nine = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x2E7D32}))
	nine.position.y = 150
	nine.position.z = 106
	nine.position.x = 80
	scene.add(nine);

	zero = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x1B5E20}))
	zero.position.y = 150
	zero.position.z = 159
	zero.position.x = 80
	scene.add(zero);

	keyArray.push(one, two, three, four, five, six, seven, eight, nine, zero)

	// var q, w, e, r, t, y, u, i, o, p, a, s, d, f, g, h, j, k, l, z, x, c, v, b, n, m;
	//

	// ||||||||||||||||||||||||||||||||||||||||||||||||||||||
	a = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	a.position.y = 150
	a.position.z = -280
	a.position.x = 0
	scene.add(a);

	o = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	o.position.y = 150
	o.position.z = -227
	o.position.x = 0
	scene.add(o);

	e = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	e.position.y = 150
	e.position.z = -174
	e.position.x = 0
	scene.add(e);

	u = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	u.position.y = 150
	u.position.z = -121
	u.position.x = 0
	scene.add(u);

	i = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	i.position.y = 150
	i.position.z = -68
	i.position.x = 0
	scene.add(i);

	d = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	d.position.y = 150
	d.position.z = -15
	d.position.x = 0
	scene.add(d);

	h = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	h.position.y = 150
	h.position.z = 38
	h.position.x = 0
	scene.add(h);

	t = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	t.position.y = 150
	t.position.z = 91
	t.position.x = 0
	scene.add(t);

	n = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	n.position.y = 150
	n.position.z = 144
	n.position.x = 0
	scene.add(n);

	s = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC8E6C9}))
	s.position.y = 150
	s.position.z = 197
	s.position.x = 0
	scene.add(s);

	// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



	colon = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	colon.position.y = 150
	colon.position.z = -253
	colon.position.x = -40
	scene.add(colon);

	q = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	q.position.y = 150
	q.position.z = -200
	q.position.x = -40
	scene.add(q);

	j = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	j.position.y = 150
	j.position.z = -200
	j.position.x = -40
	scene.add(j);

	k = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	k.position.y = 150
	k.position.z = -200
	k.position.x = -40
	scene.add(k);

	x = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	x.position.y = 150
	x.position.z = -200
	x.position.x = -40
	scene.add(x);

	b = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	b.position.y = 150
	b.position.z = -200
	b.position.x = -40
	scene.add(b);

	m = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	m.position.y = 150
	m.position.z = -200
	m.position.x = -40
	scene.add(m);

	w = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	w.position.y = 150
	w.position.z = -200
	w.position.x = -40
	scene.add(w);

	v = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	v.position.y = 150
	v.position.z = -200
	v.position.x = -40
	scene.add(v);

	z = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xE8F5E9}))
	z.position.y = 150
	z.position.z = -200
	z.position.x = -40
	scene.add(z);

	

	for (var i = 0; i < keyArray.length; i++) {

		keyArray[i] = keyArray[i].clone()
		keyArray[i].position.x -=40
		keyArray[i].position.z +=30
		scene.add(keyArray[i])

		keyArray[i] = keyArray[i].clone()
		keyArray[i].position.x -=40
		keyArray[i].position.z +=10
		// scene.add(keyArray[i])

		keyArray[i] = keyArray[i].clone()
		keyArray[i].position.x -=40
		keyArray[i].position.z +=27
		// scene.add(keyArray[i])
	}

	let leftCurly = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x69F0AE}))
	leftCurly.position.y = 150
	leftCurly.position.z = 212
	leftCurly.position.x = 80
	scene.add(leftCurly);

	let rightCurly = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x00E676}))
	rightCurly.position.y = 150
	rightCurly.position.z = 265
	rightCurly.position.x = 80
	scene.add(rightCurly);

	let backSpace = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,110), new THREE.MeshBasicMaterial({color: 0x00C853}))
	backSpace.position.y = 150
	backSpace.position.z = 345
	backSpace.position.x = 80
	scene.add(backSpace);

	let qMark = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xB2FF59}))
	qMark.position.y = 150
	qMark.position.z = 241
	qMark.position.x = 40
	scene.add(qMark);

	let plus = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0x76FF03}))
	plus.position.y = 150
	plus.position.z = qMark.position.z + 53
	plus.position.x = 40
	scene.add(plus);

	let pipe = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,80), new THREE.MeshBasicMaterial({color: 0x64DD17}))
	pipe.position.y = 150
	pipe.position.z = 360
	pipe.position.x = 40
	scene.add(pipe);

	let dash = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,50), new THREE.MeshBasicMaterial({color: 0xC6FF00}))
	dash.position.y = 150
	dash.position.z = 252
	dash.position.x = 0
	scene.add(dash);

	let enter = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,120), new THREE.MeshBasicMaterial({color: 0xAEEA00}))
	enter.position.y = 150
	enter.position.z = 340
	enter.position.x = 0
	scene.add(enter);

	let tab = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,80), new THREE.MeshBasicMaterial({color: 0x64DD17}))
	tab.position.y = 150
	tab.position.z = -358
	tab.position.x = 40
	scene.add(tab);

	let capslock = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,90), new THREE.MeshBasicMaterial({color: 0xAEEA00}))
	capslock.position.y = 150
	capslock.position.z = -353
	capslock.position.x = 0
	scene.add(capslock);

	let menu = new THREE.Mesh(new THREE.BoxBufferGeometry(40,20,52), new THREE.MeshBasicMaterial({color: 0xFF5722}))
	menu.position.y = 150
	menu.position.z = 294
	menu.position.x = -80
	scene.add(menu)
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
	// 	space.position.y +=
	// // 	// lureGlow.rotation.x += controls.rotationSpeedX;
	// // 	// lureGlow.rotation.y += controls.rotationSpeedY;
	// // 	// lureGlow.rotation.z += controls.rotationSpeedZ;
	// }
	//
	// requestAnimationFrame(renderScene);

	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 16000 );

	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -1, 750, 0);
	// camera.rotation.y = 180*(Math.PI/180)
	cameraControls.target.set(0,0,0);
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
		keyboard.update();
		//


		if (keyboard.pressed("Q"))
		{
			space.position.y += 1;
			setTimeout(function(){
				space.position.y -= 1;
			}, 100)

			console.log('pressed q')
		}
		if (keyboard.pressed("W")){console.log('pressed w')}
		if (keyboard.pressed("E")){console.log('pressed e')}
		if (keyboard.pressed("R")){console.log('pressed R')}
		if (keyboard.pressed("T")){console.log('pressed T')}
		if (keyboard.pressed("Y")){console.log('pressed Y')}

		if (keyboard.pressed("U")){console.log('pressed U')}
		if (keyboard.pressed("I")){console.log('pressed I')}
		if (keyboard.pressed("O")){console.log('pressed O')}
		if (keyboard.pressed("P")){console.log('pressed P')}
		if (keyboard.pressed("A")){console.log('pressed A')}
		if (keyboard.pressed("S")){console.log('pressed S')}

		if (keyboard.pressed("D")){console.log('pressed D')}
		if (keyboard.pressed("F")){console.log('pressed F')}
		if (keyboard.pressed("G")){console.log('pressed G')}
		if (keyboard.pressed("H")){console.log('pressed H')}
		if (keyboard.pressed("J")){console.log('pressed J')}
		if (keyboard.pressed("K")){console.log('pressed K')}

		if (keyboard.pressed("L")){console.log('pressed L')}
		if (keyboard.pressed("Z")){console.log('pressed Z')}
		if (keyboard.pressed("X")){console.log('pressed X')}
		if (keyboard.pressed("C")){console.log('pressed C')}
		if (keyboard.pressed("V")){console.log('pressed V')}
		if (keyboard.pressed("B")){console.log('pressed B')}

		if (keyboard.pressed("N")){console.log('pressed N')}
		if (keyboard.pressed("M")){console.log('pressed M')}



		if(keyboard.pressed("1")){
			one.position.y += ktd
			setTimeout(function(){
				one.position.y -= ktd
			}, 100)
			console.log('pressed 1')}
		if(keyboard.pressed("2")){
			two.position.y += ktd
			setTimeout(function(){
				two.position.y -= ktd
			}, 100)
			console.log('pressed 2')}
		if(keyboard.pressed("3")){
			three.position.y += ktd
			setTimeout(function(){
				three.position.y -= ktd
			}, 100)
			console.log('pressed 3')}
		if(keyboard.pressed("4")){
			four.position.y += ktd
			setTimeout(function(){
				four.position.y -= ktd
			}, 100)
			console.log('pressed 4')}
		if(keyboard.pressed("5")){
			five.position.y += ktd
			setTimeout(function(){
				five.position.y -= ktd
			}, 100)
			console.log('pressed 5')}
		if(keyboard.pressed("6")){
			six.position.y += ktd
			setTimeout(function(){
				six.position.y -= ktd
			}, 100)
			console.log('pressed 6')}
		if(keyboard.pressed("7")){
			seven.position.y += ktd
			setTimeout(function(){
				seven.position.y -= ktd
			}, 100)
			console.log('pressed 7')}
		if(keyboard.pressed("8")){
			eight.position.y += ktd
			setTimeout(function(){
				eight.position.y -= ktd
			}, 100)
			console.log('pressed 8')}
		if(keyboard.pressed("9")){
			nine.position.y += ktd
			setTimeout(function(){
				nine.position.y -= ktd
			}, 100)
			console.log('pressed 9')}
		if(keyboard.pressed("0")){
			zero.position.y += ktd
			setTimeout(function(){
				zero.position.y -= ktd
			}, 100)
			console.log('pressed 0')}

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
