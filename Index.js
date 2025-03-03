
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

var pause = false; // boolean to check if the animation is paused or not
var running = false; // boolean to check if the animation has been set to run (different from pause/ resume)
var i;

function start(){
	if((Buggy1.length() == 0 && Buggy2.length() == 0) || running){
		console.log("no data");
		return;
	}

	i = 0;
	running = true;

	console.log('starting animation'); // testing to see if the function is being called
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas before drawing the buggy
    ctx.drawImage(background, 0, 0); // draws the background image on the canvas

	animate();
}

function animate(){
	console.log(i);

	if(i < Buggy1.length()){ // only print the points when i is in range of the length of the buggy path
		Buggy1.animate(i);
	}

	if(i < Buggy2.length()){ // only print the points when i is in range of the length of the buggy path
		Buggy2.animate(i);
	}

	if(i >= Buggy1.length() && i >= Buggy2.length()){
		i = 0;
		running = false;
		console.log("end of animation");
		return;
	}

	if(!pause){ // if the animation is not paused increment by i by 1
		i++;
	}
	
	setTimeout(animate, 8 * speed);

}

function stop(){
	pause = !pause;
	stopButton.innerHTML = pause ? "Resume" : "Pause"; // change the button text to resume if the animation is paused
}


canvas.addEventListener('mousemove', (event) => {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	console.log(`Clicked at (${x}, ${y})`); // testing to see if the function is being called
});


