var log = function () {
			console.log.apply(console,arguments)
		}
		window.onload = function () {
			canv = document.getElementById('sn')
			ctx = canv.getContext('2d')
			// 添加 监听 事件
			document.addEventListener("keydown",keyPush);
			setInterval(game,1000/15)
		}	
		var xv=yv=0,//x,y 轴速度
		px=py=10, //
		gs=tc=20, //
		ax=ay=15,  
		trail=[],tail=5
		function game () {
			px +=xv
			py +=yv

			//出界 检测
			if(px < 0) {
				px = tc - 1
			}
			if(px > tc-1) {
				px = 0
			}
			if(py < 0) {
				py = tc - 1
			}
			if(py > tc-1) {
				px = 0
			}
			//幕布
			ctx.fillStyle = 'black'
			ctx.fillRect(0,0,canv.width,canv.height)
			// tail 为蛇的长度 
			ctx.fillStyle = 'lime'
			for (var i = 0;i < trail.length;i++) {
				// snake
				//first  (200,200,18,18)
				ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2)

				// 设定 初始长度为5 若反向 则重置
				if(trail[i].x == px && trail[i].y == py) {
					tail = 5;
				}
			}
			trail.push({x:px,y:py})
            
            //更新位置
			while(trail.length>tail){
				trail.shift()
			}
			//snake block collision  长度+1  再随机ax,ay   变换block 位置
			if (ax == px && ay == py) {
				tail++
				ax=Math.floor(Math.random()*tc)
				ay=Math.floor(Math.random()*tc)
			}
			//draw block
			ctx.fillStyle = 'red'
			ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2)
		}
		function keyPush (e) {
			switch(e.keyCode) {
				case 37:
					xv=-1;yv=0;
					break;
				case 38:
					xv=0;yv=-1;
					break;
				case 39:
					xv=1;yv=0;
					break;
				case 40:
					xv=0;yv=1;
					break;
			}
		}