
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

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");

var Buggy1 = new Buggy(1, 'blue');
var Buggy2 = new Buggy(2, 'red');


color1.addEventListener('change', (event) => {
	Buggy1.setColor(event.target.value);
});

color2.addEventListener('change', (event) => {
	Buggy2.setColor(event.target.value);
});


function start(){
	if(Buggy1.length() == 0 && Buggy2.length() == 0){
		console.log("no data");
		return;
	}

	console.log('starting animation'); // testing to see if the function is being called
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas before drawing the buggy
    ctx.drawImage(background, 0, 0); // draws the background image on the canvas

	let i = 0;
	animate(i);
	
}

function animate(i){
	console.log(i);

	if(i < Buggy1.length()){
		Buggy1.animate(i);
	}

	if(i < Buggy2.length()){
		Buggy2.animate(i);
	}

	if(i >= Buggy1.length() && i >= Buggy2.length()){
		return;
	}

	i++;

	setTimeout(() => {
		requestAnimationFrame(animate(i));
	  }, 8); // Add a 8ms delay

}


