AFRAME.registerComponent("balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
     

      if (e.key === "x" || e.key === "X") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.5,
        });

        ball.setAttribute("material", "color", "black");
        ball.setAttribute("dynamic-body",{
          shape:'sphere',
          mass:0
        });

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: 1.7,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        // Add Event listener to bullet
        ball.addEventListener('collide',this.deleteBall);
        scene.appendChild(ball);
      }
    });
  },
  deleteBall: function(e){
    //this will give the details about the orginal entity on which trigger 
    console.log(e.detail.target.el)

     //this will give the details about the other entity on which bullet touched 
     console.log(e.detail.body.el)

     var element = e.detail.target.el;
     var elementHit = e.detail.body.el;

     if(elementHit.id.includes('box')){
      elementHit.setAttribute("material",{opacity:0.4,transparent:true});

      //impulse
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'));

      elementHit.body.applyImpulse(impulse, worldPoint);

      element.removeEventListener('collide',this.shoot);
      
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
     }

  }
});


