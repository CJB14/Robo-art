const mutation = require('./mutation.js');

const formattedDate = mutation.format_date(new Date());
console.log(formattedDate); // Outputs the formatted date, e.g., "Jul/02/2023"
