const canv = document.querySelector('#canv')
const ctx = canv.getContext('2d')
var log  = console.log.bind(console)



const user = {
	x: 0,
	y: canv.height/2-100/2,
	width: 10,
	height: 100,
	color: 'white',
	score: 0,
}
const ball = {
	x: canv.width/2,
	y: canv.height/2,
	radius: 10,
	speed: 5,
	vx: 5,  //velocity
	vy: 5,
	color: 'white',
}
const AI = {
	x: canv.width-10,
	y: canv.height/2-100/2,
	width: 10,
	height: 100,
	color: 'white',
	score: 0,
}

function draw_rect(x,y,w,h,color) {
	// body...
	ctx.fillStyle = color
	ctx.fillRect(x,y,w,h);
}
function draw_circle(x,y,color) {
	ctx.fillStyle = color
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2, false);
 	ctx.fill();
	ctx.closePath()
}
function draw_text(text,x,y,color) {
	ctx.fillStyle = color
	ctx.font = '45px fantasy'
	ctx.fillText(text,x,y)
}
function draw_bg() {
	draw_rect(0,0,canv.width,canv.height,'black')
	draw_rect(298,0,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,60,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,120,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,180,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,240,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,300,4,50,'rgba(255,255,255,.75)')
	draw_rect(298,360,4,50,'rgba(255,255,255,.75)')
}




window.addEventListener('mousemove',keypush)
function keypush(e) {
	let rect = canv.getBoundingClientRect();
	user.y = e.clientY - rect.top- user.height/2

}

function collision(b,p) {
	b.top = b.y -b.radius
	b.bottom = b.y + b.radius
	b.left = b.x - b.radius
	b.right = b.x + b.radius

	p.top = p.y
	p.bottom = p.y + p.height
	p.left = p.x
	p.right = p.x + p.width

	return b.right>p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom 
}
function update() {
	ball.x += ball.vx
	ball.y += ball.vy
	
	let AIlevel = 0.1
	AI.y += (ball.y - (AI.y+AI.height/2)) * AIlevel

	if(ball.y+ball.radius > canv.height || ball.y-ball.radius < 0) {
		ball.vy = -ball.vy
		wall.play()
	}
	let player = (ball.x+ball.radius < canv.width/2) ? user : AI
	if (collision(ball,player)) {
		hit.play()
		let collidePoint = (ball.y - (player.y + player.height/2));

        collidePoint = collidePoint / (player.height/2);

        let angleRad = (Math.PI/4) * collidePoint;

        let direction = (ball.x + ball.radius < canv.width/2) ? 1 : -1;
        ball.vx = direction * ball.speed * Math.cos(angleRad);
        ball.vy = ball.speed * Math.sin(angleRad);
 
		ball.speed += 0.1;
	}

	if (ball.x - ball.radius<0) {
		AIscore.play()
		AI.score++
		resetBall()
	}else if(ball.x + ball.radius > canv.width) {
		userscore.play()
		user.score++
		resetBall()
	}
}
function resetBall() {
	ball.x = canv.width/2
	ball.y = canv.height/2
	ball.vx= 5  //velocity
	ball.speed = 7
}
function game() {
	requestAnimationFrame(game)

	update()
	draw_bg()
	draw_text(user.score,canv.width/4,canv.height/5,'white')
	draw_text(AI.score,3*canv.width/4,canv.height/5,'white')
	draw_rect(user.x,user.y,user.width,user.height,user.color)
	draw_rect(AI.x,AI.y,AI.width,AI.height,AI.color)
	draw_circle(ball.x,ball.y,ball.color)
	
}

game()