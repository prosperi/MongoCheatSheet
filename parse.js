fs = require('fs');


fs.readFile('./data.json', 'utf8',function(err, data){
	if(err) throw err;

	data = JSON.parse(data);

	var mongoShell = data.mongo_shell;
	parse(mongoShell);

	var queryAndProjection = data.query_and_projection;
	Object.keys(queryAndProjection)
		.forEach((field) => {
			parse(queryAndProjection[field]);
		});


	output = JSON.stringify(data, null, 2);

	fs.writeFile('./output.json', output, 'utf8', function (err) {
		if(err) throw err;
		console.log('Data written successfully');
	})
});

function parse(arr) {
	Object.keys(arr)
		.forEach((key) => {
			var commands = [];
			commands.push(arr[key][0]);
			
			var  description = arr[key][1];
			
			arr[key] = {description, commands};
		});
}