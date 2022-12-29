const axios = require('axios');
const AsciiTable = require('ascii-table')
// LOAD ENV
require('dotenv').config();
const sleep = require('util').promisify(setTimeout);



// Get Token to axios
const getToken = async () => {

	var param = {
        nip: process.env.NIP,
        passw: process.env.PASSWORD
    };

	// console.log(param);return;

	var end_point = 'https://skptendik.apps.undip.ac.id/index.php/auth/generateJwt';

    // post to end_point, using axios
	// header : Content-Type: application/json
	// x-www-form-urlencoded
	const response = await axios.post(end_point, param, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	if (response.data.status === 'error') {
		return {
			status : 'error',
			message : response.data.message
		}
	}

    return response.data.token
}

const getTokenSingle = async (nip, password) => {

	var param = {
        nip: nip,
        passw: password
    };

	// console.log(param);return;

	var end_point = 'https://skptendik.apps.undip.ac.id/index.php/auth/generateJwt';

    // post to end_point, using axios
	// header : Content-Type: application/json
	// x-www-form-urlencoded
	const response = await axios.post(end_point, param, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	if (response.data.status === 'error') {
		return {
			status : 'error',
			message : response.data.message
		}
	}

    return response.data.token
}

// Read token using axios
const readToken = async (token) => {
    var end_point = 'https://skptendik.apps.undip.ac.id/index.php/auth/validateJwt';

	// get to end_point, using axios, with token
	const response = await axios.get(end_point, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return response.data
}

// get Logbook
const getLogbook = async (token,start_date, end_date) => {
    var end_point = 'https://skptendik.apps.undip.ac.id/index.php/auth/logBooks';

	var param = {
		date: start_date,
		date_end: end_date
	};

	// get to end_point, with param, using axios, with token
	const response = await axios.get(end_point, {
		params: param,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return response.data
	
}

const validateData = async (data) => {
	var error = false;
	var message = '';
	if (!data.hasOwnProperty('tanggal_logbook')) {
		error = true;
		message = 'tanggal_logbook is required';
	} else if (!data.hasOwnProperty('waktu_mulai')) {
		error = true;
		message = 'waktu_mulai is required';
	} else if (!data.hasOwnProperty('waktu_selesai')) {
		error = true;
		message = 'waktu_selesai is required';
	} else if (!data.hasOwnProperty('uraian_aktivitas')) {
		error = true;
		message = 'uraian_aktivitas is required';
	} else if (!data.hasOwnProperty('output')) {
		error = true;
		message = 'output is required';
	} else if (!data.hasOwnProperty('jumlah_satuan')) {
		error = true;
		message = 'jumlah_satuan is required';
	} else if (!data.hasOwnProperty('idjeniskegiatan')) {
		error = true;
		message = 'idjeniskegiatan is required';
	} 

	if (error) {
		return {
			status: 'error',
			message: message
		}
	};

	// tanggal_logbook should be in format : YYYY-MM-DD, and within this year 
	if (data.tanggal_logbook) {
		var date = new Date(data.tanggal_logbook);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (year !== new Date().getFullYear()) {
			error = true;
			message = 'tanggal_logbook should be in this year';
		} else if (month < 1 || month > 12) {
			error = true;
			message = 'tanggal_logbook should be in format : YYYY-MM-DD';
		} else if (day < 1 || day > 31) {
			error = true;
			message = 'tanggal_logbook should be in format : YYYY-MM-DD';
		}
	}
	// tanggal_logbook should not be sunday or saturday
	if (data.tanggal_logbook) {
		var date = new Date(data.tanggal_logbook);
		var day = date.getDay();
		if (day === 0 || day === 6) {
			error = true;
			message = 'tanggal_logbook should not be sunday or saturday';
		}
	}
	// waktu_mulai should be in format : HH:MM, and before waktu_selesai
	if (data.waktu_mulai) {
		var time = data.waktu_mulai.split(':');
		var hour = time[0];
		var minute = time[1];
		if (hour < 0 || hour > 23) {
			error = true;
			message = 'waktu_mulai should be in format : HH:MM';
		} else if (minute < 0 || minute > 59) {
			error = true;
			message = 'waktu_mulai should be in format : HH:MM';
		}
	}
	if (data.waktu_mulai && data.waktu_selesai) {
		var time_mulai = data.waktu_mulai.split(':');
		var time_selesai = data.waktu_selesai.split(':');
		var hour_mulai = time_mulai[0];
		var hour_selesai = time_selesai[0];
		var minute_mulai = time_mulai[1];
		var minute_selesai = time_selesai[1];
		if (hour_mulai > hour_selesai) {
			error = true;
			message = 'waktu_mulai should be before waktu_selesai';
		} else if (hour_mulai === hour_selesai && minute_mulai > minute_selesai) {
			error = true;
			message = 'waktu_mulai should be before waktu_selesai';
		}
	}
	// waktu_selesai should be in format : HH:MM and after waktu_mulai
	if (data.waktu_selesai) {
		var time = data.waktu_selesai.split(':');
		var hour = time[0];
		var minute = time[1];
		if (hour < 0 || hour > 23) {
			error = true;
			message = 'waktu_selesai should be in format : HH:MM';
		} else if (minute < 0 || minute > 59) {
			error = true;
			message = 'waktu_selesai should be in format : HH:MM';
		}
	}
	// uraian_aktivitas should be string and not empty
	// output should be string and not empty
	// jumlah_satuan should be number and not empty
	if (data.jumlah_satuan) {
		if (isNaN(data.jumlah_satuan)) {
			error = true;
			message = 'jumlah_satuan should be number';
		}
	}
	// idjeniskegiatan should be number and not empty
	if (data.idjeniskegiatan) {
		if (isNaN(data.idjeniskegiatan)) {
			error = true;
			message = 'idjeniskegiatan should be number';
		}
	}
	// idjeniskegiatan should be between 1 and 3
	if (data.idjeniskegiatan) {
		if (data.idjeniskegiatan < 1 || data.idjeniskegiatan > 3) {
			error = true;
			message = 'idjeniskegiatan should be between 1 and 3';
		}
	}

	if (error) {
		return {
			status: 'error',
			message: message
		}
	}

	return {
		status: 'success',
		message: 'data is valid'
	}
}

const postLogbook = async (token, data, no_validate = true) => {
	var end_point = 'https://skptendik.apps.undip.ac.id/index.php/auth/saveLogBook';

	if (!no_validate) {
		const validate = validateData(data);
		if (validate.status === 'error') {
			return {
				status: 'error',
				message: validate.message
			}
		}
	}
	// console.log(data);return;


	// post to end_point, with data, using axios, with token
	const response = await axios.post(end_point, data, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	if (response.data.status === 'error') {
		return {
			status: 'error',
			message: response.data.message
		}
	}else{
		return {
			status: 'success',
			message: response.data.message
		}
	}
}

const batchValidateData = async (data) => {
	// console.log(data);return;
	var error = false;
	var message = [];
	await data.forEach(async (item) => {
		const validate = await validateData(item);
		if (validate.status === 'error') {
			error = true;
			message.push("Data item : " + item.tanggal_logbook + " dengan uraian " + item.uraian_aktivitas + " is not valid | reason : " + validate.message);
		}
	});

	if (error) {
		message = message.join('\n ');
		return {
			status: 'error',
			message: message
		}
	}


	return {
		status: 'success',
		message: 'All data is valid'
	}
}


const batchPostLogbook = async (token, data) => {
	var error = false;
	
	var message = [];
	var i = 0;
	
	// use for of to iterate data
	for (const item of data) {
		i++;
		process.stdout.write("Proses ke "+ i + " Data item : " + item.tanggal_logbook + " dengan uraian " + item.uraian_aktivitas +   "\n");
		

		const result = await postLogbook(token, item, false);
		// const result = {
		// 	'status' : 'success'
		// }

		if (result.status === 'error') {
			error = true;
			message.push("Data item : " + item.tanggal_logbook + " dengan uraian " + item.uraian_aktivitas + " ERROR PUSH");
		}

		// check if the last item
		if (i == data.length) {
			break;
		}


        var min_time = parseInt(process.env.REQUEST_MIN_DELAY);
        var max_time = parseInt(process.env.REQUEST_MAX_DELAY);


        var random_time = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;

        
        process.stdout.write("delaying request for "+ random_time +" seconds \n");

		await sleep(random_time * 1000);
	}

	if (error) {
		message = message.join('\n ');
		return {
			status: 'error',
			message: message
		}
	}


	return {
		status: 'success',
		message: 'All data is valid'
	}
}

const checkDuplicate = async (token,data) => {
	// get the minimum date of data.tanggal_logbook
	var min_date = data[0].tanggal_logbook;
	data.forEach((item) => {
		if (item.tanggal_logbook < min_date) {
			min_date = item.tanggal_logbook;
		}
	});

	// get the maximum date of data.tanggal_logbook
	var max_date = data[0].tanggal_logbook;
	data.forEach((item) => {
		if (item.tanggal_logbook > max_date) {
			max_date = item.tanggal_logbook;
		}
	});
	
	var log_book = await getLogbook(token,min_date,max_date);

	if (log_book.status === 'error') {
		return {
			status: 'error',
			message: log_book.message
		}
	}
	
	log_book = log_book.data;

	// console.log(log_book);return;

	// only take tanggal_logbook, waktu_mulai, waktu_selesai, uraian_aktivitas, output, jumlah_satuan, idjeniskegiatan
	log_book = log_book.map((item) => {
		return {
			tanggal_logbook : item.tanggal_logbook,
			waktu_mulai : item.waktu_mulai,
			waktu_selesai : item.waktu_selesai,
			uraian_aktivitas : item.uraian_aktivitas,
			output : item.output,
			jumlah_satuan : item.jumlah_satuan,
			idjeniskegiatan : item.idjeniskegiatan
		}
	});

	// get the duplicate data
	var duplicate = [];
	data.forEach((item) => {
		var duplicate_item = log_book.find((log) => {
			// console.log(item,log);return;
			return log.tanggal_logbook == item.tanggal_logbook 
				&& log.waktu_mulai == item.waktu_mulai
				&& log.waktu_selesai == item.waktu_selesai 
				&& log.uraian_aktivitas == item.uraian_aktivitas 
				// && log.output == item.output 
				// && log.jumlah_satuan == item.jumlah_satuan 
				// && log.idjeniskegiatan == item.idjeniskegiatan
			;
		});
		if (duplicate_item){
			duplicate.push(duplicate_item);
		}
		// duplicate.push(duplicate_item);
	});

	return duplicate;
}

const printASCII = (title,data) => {
	var table = AsciiTable.factory({
		title: title,
		heading: ['tanggal_logbook', 'waktu_mulai', 'waktu_selesai', 'uraian_aktivitas', 'output', 'jumlah_satuan', 'idjeniskegiatan'],
		rows: data.map((item) => {
			return [
				item.tanggal_logbook,
				item.waktu_mulai,
				item.waktu_selesai,
				item.uraian_aktivitas,
				item.output,
				item.jumlah_satuan,
				item.idjeniskegiatan
			]
		})
	});

	
	console.log(table.toString());
}



// export
module.exports = {
	getToken,
	getTokenSingle,
	readToken,
	getLogbook,
	postLogbook,
	batchPostLogbook,
	validateData,
	batchValidateData,
	checkDuplicate,
	printASCII
}
