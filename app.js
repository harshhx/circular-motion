const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#142850', '#27496d', '#00909e', '#dae1e7']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.radians = Math.random() * 2 * Math.PI;
  this.velocity = 0.05;
  this.distanceFromCenter = Math.random() * (130 - 50) + 50;
  this.lastMouse = {x:x ,y:y} ;


  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y
    };
    // move points
    this.radians += this.velocity;
    // create drag
     this.lastMouse.x += (mouse.x - this.lastMouse.x)*0.06
     this.lastMouse.y += (mouse.y - this.lastMouse.y)*0.06

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPoint)
  }

  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath()
  }


}

// Implementation
let particles;

function init() {
  particles = [];

  for (let i = 0; i < 100; i++) {
   const radius = (Math.random()*5)+1;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, colors[Math.floor(Math.random()*4)]))
  }
  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255 , 255 , 255 , 0.05) ';
  c.fillRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

init() ;
animate() ;
setTimeout(function(){ document.querySelector("h1").classList.add("invisible") }, 1475);
