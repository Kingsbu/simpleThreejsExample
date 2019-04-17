// import the three-particle fire


particleFire.install( { THREE: THREE } )
var clock = new THREE.Clock();

// Create an empty scene
var scene = new THREE.Scene();


// Create a basic perspective camera
var width  = window.innerWidth,
    height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000 );


// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer( {antialias:true});

//Configure renderer clear color
renderer.setClearColor("#00b5cc");
renderer.shadowMap = true;

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );


// --------------------------------------------
// FUN START HERE
// --------------------------------------------- 
// create a cylinder Geometry 
//                    
//----------------------------------------------------------------------------------------
//
//---------------------------------------------------------------------------------------
var texture = new THREE.TextureLoader().load('textture/grasslight-big.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
var geometry = new THREE.PlaneBufferGeometry(130,130,20,20);
var material = new THREE.MeshLambertMaterial({map:texture});
material.side = THREE.DoubleSide;
var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = -4.04; 

//-----------------------------First Hut -------------------------------------------------------
// first hut roof 
texture = new THREE.TextureLoader().load('textture/roof-texture-seamless.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
var geometry = new THREE.CylinderGeometry( 0, 10, 10, 16, true );
var material = new THREE.MeshLambertMaterial( {map: texture} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.castShadow = true;

// first hut wall structure
texture = new THREE.TextureLoader().load('textture/hut_wall.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.CylinderGeometry(7, 7,10,24, true);
material = new THREE.MeshPhongMaterial({map: texture});
var bottomCylinder = new THREE.Mesh( geometry, material);
bottomCylinder.castShadow = true;

// door cylinder
geometry = new THREE.CylinderGeometry(3, 3, 7.2, 5, true);
material = new THREE.MeshBasicMaterial({color: "gray"});
var doorCylinder = new THREE.Mesh(geometry, material);

// window cylinder
geometry = new THREE.CylinderGeometry(3, 3, 4, 5);
var windowCylinder = new THREE.Mesh(geometry, material);


//--------------------------------------------------------------------------------------------

//-------------------------------------Second Hut---------------------------------------------
// second hut roof
texture = new THREE.TextureLoader().load('textture/roof-texture-seamless.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.CylinderGeometry( 0, 10, 10, 16, true );
material = new THREE.MeshLambertMaterial( {map: texture} );
var secondHutRoof = new THREE.Mesh( geometry, material );
secondHutRoof.castShadow =true;

// second hut wall
texture = new THREE.TextureLoader().load('textture/hut_wall.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.CylinderGeometry(7, 7,10,24, true);
material = new THREE.MeshLambertMaterial({map: texture});
var secondHutBbottom = new THREE.Mesh( geometry, material);
secondHutBbottom.castShadow =true;

// second door
geometry = new THREE.CylinderGeometry(3, 3, 7.2, 5, true);
material = new THREE.MeshBasicMaterial({color: "gray"});
var secondHutDoor = new THREE.Mesh(geometry, material);



//-------------------------------Igloo---------------------------------------------------------
texture = new THREE.TextureLoader().load('textture/roof-texture-seamless.jpg');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();


geometry = new THREE.SphereBufferGeometry(14, 15, 40, 45, 2* Math.PI, 0 ,0.5  * Math.PI);
material = new THREE.MeshPhongMaterial( {map: texture} );
var sphere = new THREE.Mesh( geometry, material);
sphere.castShadow = true;

texture = new THREE.TextureLoader().load('textture/hut_wall.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.CylinderGeometry(12 ,12 , 6.5 , 30);
material = new THREE.MeshPhongMaterial({map: texture});
var iglooBottom = new THREE.Mesh(geometry, material);
iglooBottom.castShadow =true;

/*----------------------------------------------------------------------------------------
*                             Water              
*                                                                                        * 
*****************************************************************************************/
texture = new THREE.TextureLoader().load('textture/water.jpg')
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.CylinderGeometry(12 ,12 , 1 , 30);
material = new THREE.MeshPhongMaterial({map: texture});
var smallPond = new THREE.Mesh(geometry,material);

/*--------------------------------------------------------------------------------------------
*
*
------------------------------------Light Source---------------------------------------------------*/
var ambiColor = "#0c0c0c";
var ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);


var light = new THREE.DirectionalLight("white", 1);
light.position.set(-40, 60, -10);
light.shadowCameraNear = 2;
light.shadowCameraFar = 200;
light.shadowCameraLeft = -50;
light.shadowCameraRight = 50;
light.shadowCameraTop = 50;
light.shadowCameraBottom = -50;

light.castShadow = true;
light.target = plane;
light.shadowCameraVisible = true;


//-----------------------------create light sphere---------------------------------------
texture = new THREE.TextureLoader().load('textture/sun.png')
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
geometry = new THREE.SphereBufferGeometry(10,24,24);
material = new THREE.MeshBasicMaterial({map: texture});
var sun = new THREE.Mesh(geometry, material)


// rotate added hut feature door window
windowCylinder.rotation.y = -1.0;
doorCylinder.rotation.y = 3.1;


// second door rotation
secondHutDoor.rotation.y = 3.1;

/***************************************************************************************
------------------------------- Position the the Geometry-------------------------------
* set (x ,y ,z)
*
*
----------------------------------------------------------------------------------------
***************************************************************************************/


//----------------scene position of the igloo object
iglooBottom.position.set(32.5 ,-1.0 ,-40.0);
sphere.position.set(32.0, -2.0, -40.0);

//----------------first hut scene position------------------------------------------------
doorCylinder.position.set(0.0, -1.0, 4.585);
windowCylinder.position.set(-4.590, 0.0, 0.0 );
cylinder.position.set(0.0, 8.0 ,0.0); 
bottomCylinder.position.set(0.0,0.0,0.0); 

//---------------------------second hut scene position-------------------------------------
secondHutRoof.position.set(60, 8, 5);
secondHutBbottom.position.set(60, 0, 5);
secondHutDoor.position.set(60, -1.0, 9.580);

//--------------------------------ponds position-------------------------------------------

smallPond.position.set (20.0, -4.50, 30);

//-----------------------light position in the scene --------------------------------------
scene.add(light);


/*****************************************************************************************
*                               Fire
*
******************************************************************************************/
var fireRadius = 4;
var fireHeight = 20;
var particleCount = 20000;
var geometry0 = new particleFire.Geometry( fireRadius, fireHeight, particleCount );
var material0 = new particleFire.Material( { color: 0xff2200 } );
material0.setPerspective( camera.fov, height );
var fire = new THREE.Points( geometry0, material0 );
fire.position.set(28,-4,5);

/****************************************************************************************
 *                              fire light source                                       *
 ****************************************************************************************/
var firelight = new THREE.PointLight( 0xffffff, 1, 100 );
firelight.position.set( 0, 10, 0 );
firelight.castShadow = true; 
firelight.position.set(28,-2,5);



/*****************************************************************************************
*                               Gui interface
*
******************************************************************************************/
var check = {rotate: false, direction: false,night: false, rotationSpeed: 0.01, Zoom: 1 }

// create a gui control box
var gui = new dat.GUI();


gui.add(check, 'rotate').onChange( function(){} );
gui.add(check, 'direction').onChange( function(){} );
gui.add(check, 'night').onChange( function(){} );
gui.add(check, 'rotationSpeed', 0.01, 0.10);
gui.add(check, 'Zoom', 1, 5);



/*****************************************************************************************
*                    Add object into the scene
*
*
*******************************************************************************************/

scene.add(plane);
//--------------------------add light to scene-------------------------------------------
light.add(sun);


//--------------first hut objects added to the scene-------------------------------------

scene.add(doorCylinder);
scene.add(windowCylinder);
scene.add( cylinder);
scene.add( bottomCylinder);

//--------------add igloo object into the scene-------------------------------------------
scene.add( sphere );
scene.add(iglooBottom);

//-------------second hut objects added into the scene------------------------------------
scene.add(secondHutRoof);
scene.add(secondHutBbottom);
scene.add(secondHutDoor);

//--------------add smallPond to scence------------------------------------------------
scene.add(smallPond);

camera.position.z = 125;
camera.position.y = 30;

//var zoomLastValue = check.Zoom;


// Render Loop
var render = function () {
    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime


    requestAnimationFrame( render );
    
    fire.material.update( delta * 0.75);
    if (check.rotate){ 
        
        if(check.direction){
            scene.rotation.y +=  -check.rotationSpeed;
        }else{
            scene.rotation.y += check.rotationSpeed;
        }
    }

    

    if (check.night){
        scene.remove(light);
        scene.add(firelight);
        scene.add(fire);        
    }else{
        scene.add(light);
        scene.remove(firelight);
        scene.remove(fire);
    }
    //    cameraZoom(check.Zoom);
    camera.zoom = check.Zoom;
    camera.updateProjectionMatrix();

    plane.rotation.z = 0.01;
    
    // Render the scene
    renderer.render( scene, camera );
};

render();