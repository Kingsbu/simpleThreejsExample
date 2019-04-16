// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );


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
var geometry = new THREE.PlaneBufferGeometry(130,130,20,20);
var material = new THREE.MeshPhongMaterial({color: "#f2784b"});
material.side = THREE.DoubleSide;
var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = -4.04; 

//-----------------------------First Hut -------------------------------------------------------
// first hut roof 
var geometry = new THREE.CylinderGeometry( 0, 10, 10, 16, true );
var material = new THREE.MeshPhongMaterial( {color: 0x8F8073} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.castShadow = true;

// first hut wall structure
geometry = new THREE.CylinderGeometry(7, 7,10,24, true);
material = new THREE.MeshPhongMaterial({color: 0x12130F});
var bottomCylinder = new THREE.Mesh( geometry, material);
bottomCylinder.castShadow = true;

// door cylinder
geometry = new THREE.CylinderGeometry(3, 3, 7.2, 5, true);
material = new THREE.MeshBasicMaterial({color: "#EAE6E5"});
var doorCylinder = new THREE.Mesh(geometry, material);

// window cylinder
geometry = new THREE.CylinderGeometry(3, 3, 4, 5);
var windowCylinder = new THREE.Mesh(geometry, material);


//--------------------------------------------------------------------------------------------

//-------------------------------------Second Hut---------------------------------------------
// second hut roof
geometry = new THREE.CylinderGeometry( 0, 10, 10, 16, true );
material = new THREE.MeshLambertMaterial( {color: 0x8F8073} );
var secondHutRoof = new THREE.Mesh( geometry, material );
secondHutRoof.castShadow =true;

// second hut wall
geometry = new THREE.CylinderGeometry(7, 7,10,24, true);
material = new THREE.MeshLambertMaterial({color: 0x12130F});
var secondHutBbottom = new THREE.Mesh( geometry, material);
secondHutBbottom.castShadow =true;

// second door
geometry = new THREE.CylinderGeometry(3, 3, 7.2, 5, true);
material = new THREE.MeshBasicMaterial({color: "#EAE6E5"});
var secondHutDoor = new THREE.Mesh(geometry, material);



//-------------------------------Igloo---------------------------------------------------------

geometry = new THREE.SphereBufferGeometry(14, 15, 40, 45, 2* Math.PI, 0 ,0.5  * Math.PI);
material = new THREE.MeshPhongMaterial( {color: 0x8F8073} );
var sphere = new THREE.Mesh( geometry, material);
sphere.castShadow = true;

geometry = new THREE.CylinderGeometry(12 ,12 , 6.5 , 30);
material = new THREE.MeshPhongMaterial({color: 0x12130F});
var iglooBottom = new THREE.Mesh(geometry, material);
iglooBottom.castShadow =true;

/*----------------------------------------------------------------------------------------
*                             Water              
*                                                                                        * 
*****************************************************************************************/
geometry = new THREE.CylinderGeometry(12 ,12 , 1 , 30);
material = new THREE.MeshLambertMaterial({color: 0x9be3fd, opacity:0.4, transparency: true});
var smallPond = new THREE.Mesh(geometry,material);

/*--------------------------------------------------------------------------------------------
*
*
------------------------------------Light Source---------------------------------------------------*/
var ambiColor = "#0c0c0c";
var ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);


var light = new THREE.SpotLight("#ffffff", 1);
light.position.set(-40, 60, -10);
light.castShadow = true;
light.target = plane;
light.shadowCameraVisible = true;


//-----------------------------create light sphere---------------------------------------
geometry = new THREE.SphereBufferGeometry(10,24,24);
material = new THREE.MeshBasicMaterial({color: "yellow"});
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
doorCylinder.position.set(0.0, -1.0, 4.573);
windowCylinder.position.set(-4.569, 0.0, 0.0 );
cylinder.position.set(0.0, 8.0 ,0.0); 
bottomCylinder.position.set(0.0,0.0,0.0); 

//---------------------------second hut scene position-------------------------------------
secondHutRoof.position.set(60, 8, 5);
secondHutBbottom.position.set(60, 0, 5);
secondHutDoor.position.set(60, -1.0, 9.572);

//--------------------------------ponds position-------------------------------------------

smallPond.position.set (20.0, -4.50, 30);

//-----------------------light position in the scene --------------------------------------
scene.add(light);


/*****************************************************************************************
*                               Gui interface
*
******************************************************************************************/
var check = {rotate: false, direction: false, rotationSpeed: 0.01, Zoom: 1 }

// create a gui control box
var gui = new dat.GUI();


gui.add(check, 'rotate').onChange( function(){} );
gui.add(check, 'direction').onChange( function(){} );
gui.add(check, 'rotationSpeed', 0.01, 0.10);
gui.add(check, 'Zoom', 1, 5);

/*function cameraZoom(zoom){    
   camera.position.z = check.Zoom;
   switch(check.Zoom){
    case 130: camera.position.y = 30;
        break;
    case 100: camera.position.y = 25;
        break;
    case 80:  camera.position.y = 20;
        break;
    case 60:  camera.position.y = 15;
        break;
    case 40:  camera.position.y = 10;
        break;    
    case 20:  camera.position.y = 5;
        break;
   }
}*/

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
    
    requestAnimationFrame( render );

    if (check.rotate){ 
        
        if(check.direction){
            scene.rotation.y +=  -check.rotationSpeed;
        }else{
            scene.rotation.y += check.rotationSpeed;
        }
    }

    //    cameraZoom(check.Zoom);
    camera.zoom = check.Zoom;
    camera.updateProjectionMatrix();

    plane.rotation.z = 0.01;
    // Render the scene
    renderer.render( scene, camera );
};

render();