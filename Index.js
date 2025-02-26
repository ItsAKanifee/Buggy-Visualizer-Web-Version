
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "Images/Background.png";

background.onload = function(){
	loadBackground();
}

function loadBackground(){
	console.log("loading background");
	ctx.drawImage(background, 0, 0);
}

var Buggy1 = new Buggy(1);
var Buggy2 = new Buggy(2);

const rate = document.getElementById("speed");

var speed = 20/rate.value;

rate.addEventListener('input', (event) => {
	speed = 20 / event.target.value;
});

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

var pause = false;
var i;

function start(){
	i = 0;

	if(Buggy1.length() == 0 && Buggy2.length() == 0){
		console.log("no data");
		return;
	}

	console.log('starting animation'); // testing to see if the function is being called
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas before drawing the buggy
    ctx.drawImage(background, 0, 0); // draws the background image on the canvas

	animate();
}

function animate(){
	console.log(i);

	if(i < Buggy1.length()){
		Buggy1.animate(i);
	}

	if(i < Buggy2.length()){
		Buggy2.animate(i);
	}

	if(i >= Buggy1.length() && i >= Buggy2.length()){
		i = 0;
		return;
	}

	if(!pause){
		i++;
	}
	
	setTimeout(animate, 8 * speed);

}

function stop(){
	//cancelAnimationFrame(frame);
	pause = !pause;
	stopButton.innerHTML = pause ? "Resume" : "Pause";
}


