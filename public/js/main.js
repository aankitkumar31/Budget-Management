
function makeDateFormat(date){
	let d = new Date(date);
	var month = (d.getMonth()+1).toString();
	let day = d.getDate().toString();
	let year = d.getFullYear();
	if(month['length'] < 2){
		month = `0${month}`;
	}
	if(day['length'] < 2){
		day = `0${day}`;
	}
	return month + "/" + day + "/" + year;
}


function todayDate(){
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	if(date < 9){
		day = "0" + parseInt(day)
	}
	if(month < 9){
		month = "0" + parseInt(month)
	}

	var fullDate = year + '-' + month + '-' + day;
	return fullDate;
}