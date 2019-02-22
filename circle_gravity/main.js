var canv = document.querySelector('#canv')
canv.width = window.innerWidth
canv.height = window.innerHeight
var ctx = canv.getContext('2d')




var gravity = 1
function CircleFall(x,y,dx,dy) {
	this.x = x
	this.y = y
	this.dy = dy
	this.dx = dx
	this.radius = 30

	this.draw = function () {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
		ctx.fillStyle = "aqua"
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}

	this.update = function () {
		if (this.y+this.radius > canv.height) {
			this.dy = -this.dy * 0.9 
		}else {
			this.dy += gravity 
		}
/*		if (this.x + this.radius >canv.width || this.x - this.radius < 0) {
			this.dx = -this.dx * 0.8
		}else {
			this.dx += 1
		}*/
		this.y += this.dy
/*		this.x += this.dx */
		this.draw()
	}
}
var ballArray = []
function init() {
	for (let i = 0; i<500; i++) {
		var x = Math.random() * canv.width
		var y = (Math.random() * canv.width)-30
		ballArray.push(new CircleFall(x,y,2,30))
	}
}
var circle = new CircleFall(320,320,4,4)
function run() {
	requestAnimationFrame(run)
	ctx.clearRect(0, 0, canv.width, canv.height);

	for (let i = 0; i < ballArray.length;i++) {
		ballArray[i].update()
	}
}
init()
run()