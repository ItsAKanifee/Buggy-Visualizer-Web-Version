class Buggy{
    constructor(num, color){ // takes the number of the buggy as an input (as in buggy 1, buggy 2, etc.)
        this.color = color; // sets the color of the buggy

        let columns = {}; // stores the data from the csv file
        this.points = []; // stores the points to be read in the animation
        
        // generates the csv file which the buggy will use to get its data
        
        this.fileInput = document.getElementById(`csvFile${num}`);
        console.log(`csvFile${num}`);


        this.fileInput.addEventListener('change', (event) => { // creates an event listener for the file input that is tied to the buggy
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const csvData = event.target.result;
                const rows = csvData.split('\n');
                const headers = rows.shift().split(',');


                headers.forEach((header) => { // creates a dictionary with the headers as the keys and the values as the values
                header = header.trim(); // trim headers to remove whitespace as there may be problems with reading
                console.log(header)
                columns[header] = [];
                });

                rows.forEach((row) => {
                const values = row.split(',');
                headers.forEach((header, index) => {
                    columns[header.trim()].push(parseFloat(values[index]));
                });
                });

                console.log(columns); // testing columns were properly loaded and read
                this.analyzeData(columns);
            };

        reader.readAsText(file);
        });
    }

    analyzeData(data) { // function to analyze the data from the csv file, and load it into the points of the buggy
        console.log('analyzing data');
        
        let lat = data['latitude'] // only look at latitude and longitude for now (could change if we want to add more data)
        let long = data['longitude']

        for(let i = 0; i < lat.length; i++){ // both lat and long should be the same length, so this should work
            let y = 40.441778 - lat[i]
            let x = long[i] + 79.948917 // these are the values that scale the coordinates to the size of the canvas

            y *= 100000
            x *= 100000
            let pixelY = y * 2.14
            let pixelX = x * 1.64

            this.points[i] = [pixelX - 3, pixelY + 7]; //needs some tweaking to get the points to line up properly
        }

        console.log(this.points); // testing to see if the points were properly loaded

    }

    animate(n) { // function to animate the buggy on the canvas
        
        let i = parseInt(n); // convert n to an integer
        ctx.fillStyle = this.color; // sets the color frawn to the color of the buggy

        ctx.fillRect(this.points[i][0], this.points[i][1], 2, 2);             
    }

    length(){
        return this.points.length;
    }

    setColor(color){
        this.color = color;
    }

    
}