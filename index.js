const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


// Rectangles

// c.fillStyle = 'lightgreen';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'white';
// c.fillRect(500, 150, 100, 100);
// c.fillStyle = 'magenta';
// c.fillRect(900,100, 100, 100);



// // Line
// c.beginPath();
// c.moveTo(70, 300);
// c.lineTo(400, 100);
// c.lineTo(800, 100);
// c.lineTo(800,300);
// c.lineTo(70,300);
// c.strokeStyle = 'red';
// c.stroke();

//arc/circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2 , false);
// c.strokeStyle = 'lightblue'
// c.stroke();

//create multiple circles

// for (i = 0; i < 1; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2 , false);
//     c.strokeStyle = 'lightblue'
//     c.stroke();
// }

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
var mouse = {
    x: undefined,
    y: undefined,

}
var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
    "#A60522",
    "#F20746",
    "#1BBF15",
    "#F2B807",
    "#BF7E04"
]

window.addEventListener('mousemove', 
function(event) {
    mouse.x = event.x;
    mouse.y = event.y

})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random () * colorArray.length )];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2 , false);
        c.strokeStyle = this.color
        c.stroke();

    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;


        //  interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if  (this.radius < maxRadius){
            this.radius += 1;}
        } else if(this.radius > this.minRadius){
            this.radius -= 1
        }

        this.draw();
    }

    }





// console.log(circleArray)
var circleArray = [];
function init() {
    circleArray = [];

for(var i = 0; i < 600; i ++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius))

}

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    
}

animate();
init();