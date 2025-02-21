// This is a previous iteration of code to test the CSV reading within without classes


const fileInput = document.getElementById('csvFile1');
const fileInput2 = document.getElementById('csvFile2');
const columns = {};
const points = [[]];

function loadCSV(fileInput){

	fileInput.addEventListener('change', (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (event) => {
		const csvData = event.target.result;
		const rows = csvData.split('\n');
		const headers = rows.shift().split(',');


		headers.forEach((header) => {
		header = header.trim();
		console.log(header)
		columns[header] = [];
		});

		rows.forEach((row) => {
		const values = row.split(',');
		headers.forEach((header, index) => {
			columns[header.trim()].push(parseFloat(values[index]));
		});
		});

		console.log(columns);
		analyzeData(columns);
	};

	reader.readAsText(file);
	});

}





function analyzeData(data) {
	// do something with the data

	lat = data['latitude']
	long = data['longitude']

	loadBackground();

	for(let i = 0; i < lat.length; i++){
		y = 40.441778 - (lat[i]) 
		x = long[i] + 79.948917 
		
		y *= 100000
		x *= 100000
		pixelY = y * 2.14
		pixelX = x * 1.64

		ctx.fillStyle = "red";
		ctx.fillRect(pixelX-3, pixelY + 7, 1, 1);
	}
	
	
}



loadCSV(fileInput);