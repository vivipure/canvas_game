var canv = document.querySelector('#canv')
canv.width = window.innerWidth
canv.height = window.innerHeight


var ctx = canv.getContext('2d')

/*fillRect(x, y, width, height)
    绘制一个填充的矩形
strokeRect(x, y, width, height)
    绘制一个矩形的边框
clearRect(x, y, width, height)*/
/*
stroke  边框
fill  填充

*/
//
//beginPath()
// lineTo()  
//moveTo()
/*function draw() {
	x= Math.floor(Math.random()*550)
	y= Math.floor(Math.random()*350)
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(x, y, 50, 50);
	setTimeout(function () {
		ctx.clearRect(x,y, 50, 50);
	},500)
}
setInterval(draw,1000)
*/
//arc(x, y, radius, startAngle, endAngle, anticlockwise)
for (let i = 0; i < 1000; i++) {
	let x = Math.random() * window.innerWidth
	let y = Math.random() * window.innerHeight
	ctx.beginPath();
	ctx.arc(x,y,30,0,Math.PI * 2,false)
	ctx.strokeStyle = 'blue';
	ctx.stroke();
	ctx.fill()
}

var maxRadius = 40,minRadius = 2
function Circle(x,y,xv,yv,color) {
	this.x = x
	this.y = y
	this.xv = xv
	this.yv =yv
	this.color = color
	this.radius = Math.random() * 3 + 1
	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color
		ctx.fill()
	}
	this.update = function () {
		if (this.x + this.radius > window.innerWidth || this.x - this.radius< 0) {
			this.xv = -this.xv
		}
		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.yv = -this.yv
		}
		this.x += this.xv
		this.y += this.yv
		this.draw()

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 1
			}
		}else if (this.radius > minRadius) {
			this.radius -= 1
		}
	}
}
mouse = {
	x: undefined,
	y: undefined,
}

window.addEventListener('mousemove',function(e) {
	mouse.x = e.x
	mouse.y = e.y
})

window.addEventListener('resize', function() {
	canv.width = window.innerWidth
	canv.height = window.innerHeight
	init()
})

var circleArray = []
function init() {
	circleArray = []
	for (let i = 0; i < 800; i++) {
	x = Math.random() * window.innerWidth
	y = Math.random() * window.innerHeight
	xv = (Math.random() - 0.5) * 3
	yv = (Math.random() - 0.5) * 3
	//color = '#'+ Math.random().toString().slice(3,6)
	color = '#' + Math.floor(Math.random()*16777216).toString(16)
	circleArray.push(new Circle(x,y,xv,yv,color))
}
}

function animate() {
	//    系统时间 的定时器  可以理解为 递归
	requestAnimationFrame(animate)
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
	
	for (let i = 0; i < circleArray.length;i++) {
		circleArray[i].update()
	}

}
init()
animate()




