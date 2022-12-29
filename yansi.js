const api_function = require('./api_function.js');
const data_parse = require('./data_parse.js');
require('dotenv').config();

const jam_mulai = [
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'13:00',
	'14:00',
	'15:00',
];

const jam_akhir = [
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'14:00',
	'15:00',
	'16:00',
];

const pegawai = [
	{
		nama : 'idris',
		nip : 'H.7.198906052010061001',
		password : '98916050',
		kegiatan: [
			'koordinasi pekerjaan agar sesuai dengan sop',
			'monitoring hasil pekerjaan jika terjadi kendala',
			'eskalasi kendala yang ditemui kepada pimpinan',
			'menulis kode pengembangan aplikasi',
			'melakukan testing aplikasi jika ditemui ada bug atau kesalahan logika program',
			'mengecek kebutuhan operasional agar pekerjaan dapat berjalan dengan lancar',
			'riset teknologi terbaru untuk pengembangan diri dan pengembangan organisasi',
			'mendraft surat terkait kebutuhan organisasi',
			'mereview anggaran unit melalui aplikasi RKAT',
			'memvalidasi data yang masuk pada aplikasi terkait integrasi data dengan aplikasi yang lain',
			'istirahat sejenak agar pikiran lebih adem',
			'diskusi mengenai pekerjaan agar ditemukan solusi terhadap permasalahan yang ada',
		],
	},
];

let gen_nums = [];

function in_array(array, el) {
   for(var i = 0 ; i < array.length; i++) 
       if(array[i] == el) return true;
   return false;
}

function get_rand(array) {
    var rand = array[Math.floor(Math.random()*array.length)];
    if(!in_array(gen_nums, rand)) {
       gen_nums.push(rand); 
       return rand;
    }
    return get_rand(array);
}

async function main() {

	pegawai.forEach(async (peg, i) => {

		process.stdout.write("nama : "+ peg.nama +" \n");
	    process.stdout.write("getting token... \n");
	    // const token = await api_function.getToken();
	    const token = await api_function.getTokenSingle(peg.nip, peg.password);

	    if (token.status === 'error'){
	        process.stdout.write("ERROR getting token: \n");
	        process.stdout.write(token.message);
	        return;
	    }

	    const date = new Date();

		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		// This arrangement can be altered based on how we want the date's format to appear.
		let currentDate = `${year}-${month}-${day}`;
		// console.log(currentDate); // "2022-12-29"

	    let tanggal_logbook = currentDate;

	    process.stdout.write("logbook tgl : "+ tanggal_logbook +" \n");
	    process.stdout.write("processing :  \n");

	    gen_nums = [];
	    peg.kegiatan.forEach(function(){
	    	get_rand(peg.kegiatan);
	    });

	    let delayInMilliseconds = 2000; //1 second

	    jam_mulai.forEach(async (v, i) => {

	    	setTimeout(async () => {

	    		process.stdout.write("jam_mulai : "+ v +" \n");
		    	process.stdout.write("jam_selesai : "+ jam_akhir[i] +" \n");

		    	let data = {
		    		tanggal_logbook: tanggal_logbook,
		    		uraian_aktivitas: gen_nums[i],
		    		waktu_mulai: v,
		    		waktu_selesai: jam_akhir[i],
		    		jumlah_satuan: '1',
		    		idjeniskegiatan: '1',
		    		output: 'kegiatan',
		    	};

	    		const result = await api_function.postLogbook(token, data, false);

	    	}, i * delayInMilliseconds);

	    });

    });

    process.stdout.write("SELESAI \n");
}

main();