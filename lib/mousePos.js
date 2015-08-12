var canvas = document.getElementById('ntsCanvas');

canvas.addEventListener('mousemove', function(e){
	var elXpos = document.getElementById('xPos')
	var elYpos = document.getElementById('yPos')
	
	elXpos.innerHTML = e.offsetX;
	elYpos.innerHTML = e.offsetY;
},false)