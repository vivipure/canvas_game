const canv = document.querySelector('#canv')
const ctx = canv.getContext('2d')
const bird = new Image()
const bg = new Image()
const fg = new Image()
const pip1 = new Image()
const pip2 = new Image()
const fly = new Audio()
const sco = new Audio()

bird.src = 'img/bird.png'
fg.src = 'img/fg.png'
bg.src = 'img/bg.jpg'
pip1.src = 'img/pipeNorth.png'
pip2.src = 'img/pipeSouth.png'
fly.src = 'sound/fly.mp3'
sco.src = 'sound/score.mp3'

gap = 85
constant = 242 + gap

var score = 0
var bx = 20
var by = 150
var pip_x = 100
const gravity = 1.5


var pipe = []
pipe[0] = {
	x: canv.width - 30 ,
	y:0
}

//ctx.drawImage(img,x,y,w,h)
window.onload = function GAME() {
	// body...
	draw()

}
document.addEventListener('keydown',moveUP)
function moveUP() {
	by -= 25
	fly.play()
}

function draw() {
	ctx.drawImage(bg,0,0)


	for (let i = 0;i<pipe.length;i++) {
		ctx.drawImage(pip1,pipe[i].x,pipe[i].y)
		ctx.drawImage(pip2,pipe[i].x,pipe[i].y+constant)
		pipe[i].x--

		//pipe move
		if (pipe[i].x == 125) {
			pipe.push({
				x: canv.width,
				y: Math.floor(Math.random() * pip1.height) -pip1.height
			})
		}

		//detect collision 碰撞检测
		if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pip1.width && (by <= pipe[i].y +pip1.height || by + bird.height >= pipe[i].y+constant) || by + bird.height >= canv.height - fg.height) {
		location.reload()
		}

		if (pipe[i].x+ pip1.width == 20) {
			score++
			sco.play()
		}
	}




	ctx.drawImage(fg,0,canv.height - fg.height)
	ctx.drawImage(bird,bx,by)
	by += gravity
	ctx.fillStyle = '#000'
	ctx.font = '20px Verdana'
	ctx.fillText('Score:'+score,10,canv.height-20)
	requestAnimationFrame(draw)
}







