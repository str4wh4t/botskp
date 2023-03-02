const api_function = require("./api_function.js");
const data_parse = require("./data_parse.js");
require("dotenv").config();

const jam_mulai = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
];

const jam_akhir = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
];

const pegawai = [
    {
        nama: "yayuk erna setyawati",
        nip: "197805282014092003",
        password: "87915082",
        kegiatan: [
            "memproses surat masuk,surat keluar, undangan ke Kabiro",
            "Memproses paraf dan tanda tangan SPJ dari Bidang III ke Kabiro",
            "Menyiapkan berkas untuk kegiatan rapat Kabiro",
            "Menyiapkan Ruang Sidang untuk Kegiatan Rapat",
            "Mencatat Jadwal pemakaian Ruang Sidang BKB",
            "Input Surat Surat Masuk, dan surat keluar",
            "Scan Surat Surat Masuk dan surat surat keluar",
            "Mendistribusikan Surat Surat Masuk sesuai Disposisi Kabiro",
        ],
    },
    {
        nama: "wahyudi",
        nip: "198001141999031001",
        password: "08911041",
        kegiatan: [
            "membaca, mendisposisi dan mengerjakan disposisi surat",
            "koordinasi internal dengan Kabiro",
            "koordinasi internal dengan supervisor tpip",
            "koordinasi internal dengan supervisor tipl",
            "koordinasi internal dengan supervisor jpk",
            "membuat kajian dan analisis terhadap surat yang masuk",
            "membuat laporan kegiatan harian",
            "koordinasi tentang pengembangan sistem informasi di BKB",
        ],
    },
    {
        nama: "idris",
        nip: "H.7.198906052010061001",
        password: "98916050",
        kegiatan: [
            "koordinasi pekerjaan agar sesuai dengan sop",
            "monitoring hasil pekerjaan jika terjadi kendala",
            "eskalasi kendala yang ditemui kepada pimpinan",
            "menulis kode pengembangan aplikasi",
            "melakukan testing aplikasi jika ditemui ada bug atau kesalahan logika program",
            "mengecek kebutuhan operasional agar pekerjaan dapat berjalan dengan lancar",
            "riset teknologi terbaru untuk pengembangan diri dan pengembangan organisasi",
            "mendraft surat terkait kebutuhan organisasi",
            "mereview anggaran unit melalui aplikasi RKAT",
            "memvalidasi data yang masuk pada aplikasi terkait integrasi data dengan aplikasi yang lain",
            "istirahat dan diskusi santai dengan teman kerja tekait strategi pekerjaan",
            "diskusi mengenai pekerjaan agar ditemukan solusi terhadap permasalahan yang ada",
            "memproses usulan perbaikan data pddikti mb wenny",
            "melakukan koordinasi atas permintaan perubahan data pddikti",
            "mereview usulan draft pengajuan perubahan data pddikti tipe 1 dari bu nur",
            "mereview usulan draft pengajuan perubahan data pddikti tipe 2 dari bu nur",
            "mereview surat undangan rakor yang akan dilakukan pimpinan",
            "mereview tentang pengadaan yang sedang dilakukan di bagian sdip",
            "mereview pengajuan belanja kerumahtanggaan Subbag TPIP",
            "melaksanakan tugas lain sesuai arahan pimpinan",
            "mereview permohonan ATK ke Aset untuk keperluan perkantoran TPIP",
            "monitoring pengajuan PDM",
            "merevisi dan menyerahkan draft ajuan PDM ke manajer",
        ],
    },
    {
        nama: "Muhammad Fahmi Mukhlishin",
        nip: "H.7.199411152019011001",
        password: "49911151",
        kegiatan: [
            "Monitoring Aplikasi Yang telah dibuat",
            "Membuat coding Modul Aplikasi",
            "Melaksanakan perintah atasan",
            "Memperbaiki Aplikasi yang eror",
            "Melaksanakan koordinasi dengan yang lain",
            "Membuat coding Modul Aplikasi",
            "Menganalisa masalah dalam aplikasi",
            "Menganalisa eror aplikasi",
            "Menganalisa aplikasi",
            "Mengisi waktu santai sambil musikan",
            "Diskusi santai membahas permasalahan yang ada",
        ],
    },
    {
        nama: "Miftahul Arif",
        nip: "H.7.198704152010061001",
        password: "78914051",
        kegiatan: [
            "Monitoring surat - surat masuk",
            "Memverifikasi Usulan Kegiatan pada aplikasi Pendapatan",
            "Memproses pengajuan Virtual Account",
            "Rapat koordinasi terkait permasalahan yang ada",
            "Memeriksa draft surat keluar",
            "Menganalisis usulan tarif minimal layanan",
            "Monitoring dan evaluasi Pengembangan Aplikasi Pendukung Usaha Komersial",
            "Istirahat sejenak melepas penat",
            "Mengelola draft usulan SK Rektor tentang Kegiatan",
            "Pendampingan penyusunan Tarif minimal layanan pada Unit Usaha",
            "Diskusi santai membahas permasalahan yang ada",
            "Monitoring dan evaluasi Tarif minimal layanan pada Unit Usaha",
            "Menyusun SKP Catatan Kinerja harian ",
            "Monitoring dan Verifikasi Kinerja harian staf",
            "Mengisi waktu santai sambil musikan",
        ],
    },
    {
        nama: "noer chasanah",
        nip: "196812301994122001",
        password: "86912103",
        kegiatan: [
            "monitoring pengajuan PDM",
            "menghimpun dan mengunduh pengajuan PDM",
            "menyusun dan mencetak draft ajuan PDM",
            "merevisi dan menyerahkan draft ajuan PDM ke supervisor",
            "menghimpun dan mengunduh pengajuan pembukaan periode tipe 1 dan 2",
            "menyusun dan mencetak draft pengantar pengajuan pembukaan periode pelaporan",
            "merevisi dan menyerahkan draft ajuan pembukaan periode pelaporan ke supervisor",
            "menyusun dan mencetak pernyataan pimpinan PTN",
            "merevisi dan menyerahkan draft pernyataan pimpinan PTN",
            "menyusun tabel pendukung pengajuan pembukaan periode",
            "merevisi dan menyerahkan draft pernyataan pimpinan PTN",
            "menyusun surat nota dinas dan memo",
            "menyusun undangan rakor",
            "mencetak amplop undangan rakor",
            "menyusun daftar ekspedisi undangan",
            "menyusun daftar hadir undangan rakor",
            "memesan jamuan rakor",
            "menyiapkan ruang dan jamuan rakor",
            "melakukan koordinasi dengan notulis rakor",
            "menerima dan menandatangani invoice jamuan rakor",
            "melengkapi berkas SPJ untuk jamuan rakor",
            "scan berkas SPJ rakor",
            "menyerahkan berkas dan mengirimkan softfile kepada PUMK BKB",
            "menyusun surat tugas kegiatan pelatihan BKB dan Direktorat TIKP",
            "menyusun surat tugas pejabat pengadaan BKB",
            "menyusun SPTJM pengadaan BKB",
            "menyusun surat tugas perjalanan dinas",
            "menyusun laporan tugas driver pada kegiatan BKB",
            "menyusun daftar honorarium kegiatan",
            "menyusun surat tugas PPHP BKB",
            "belanja kerumahtanggaan Subbag TPIP",
            "memintakan nomor surat TU",
            "melaksanakan tugas lain sesuai arahan pimpinan",
            "menyusun permohonan ATK ke Aset",
            "melakukan koordinasi dengan PT Undip Maju",
        ],
    },
    {
        nama: "wenny anjar rustanti",
        nip: "199003202014042002",
        password: "09913002",
        kegiatan: [
            "Menjawab pertanyaan yang berkaitan dengan data SISTER",
            "Menjawab pertanyaan yang berkaitan dengan entry data MBKM di SIAP",
            "Menjawab pertanyaan yang berkaitan dengan perubahan pembimbing pada modul tugas akhir di SIAP",
            "Menjawab pertanyaan yang berkaitan dengan menu SKPI di SIAP",
            "Menjawab pertanyaan yang berkaitan dengan entry data RPS dan bobot MK di SIAP",
            "Menjawab pertanyaan yang berkaitan dengan data mahasiswa tidak ditemukan di PDDIKTI",
            "Menjawab pertanyaan yang berkaitan dengan data mahasiswa tidak eligible untuk PIN di PDDIKTI",
            "Menjawab pertanyaan yang berkaitan dengan pengajuan NIDK",
            "Melakukan sinkronisasi data PDDIKTI",
            "Menjawab pertanyaan yang berkaitan dengan pengajuan NIDN",
            "Menjawab pertanyaan yang berkaitan dengan perubahan data mahasiswa di PDDIKTI",
            "Menjawab pertanyaan yang berkaitan dengan penambahan prodi baru di PDDIKTI",
            "Menjawab pertanyaan yang berkaitan dengan penghapusan prodi di PDDIKTI",
            "Melakukan reset syarat lulus di SIAP",
            "Melakukan reset syarat ujian di SIAP",
            "Melakukan reset tanggal lulus di SIAP",
            "Melakukan cek data homebase dosen di PDDIKTI",
            "Melakukan perubahan data dosen di PDDIKTI",
            "Melakukan pengajuan perubahan homebase dosen di PDDIKTI",
            "Melakukan Pengajuan NIDN di PDDIKTI",
            "Melakukan Pengajuan NIDK di PDDIKTI",
            "Melakukan cek data di Neo Feeder",
            "Mengolah data ajar dosen, lulusan dan jumlah mahasiswa dari Neo Feeder untuk akreditasi",
            "Mengajukan Pembukaan periode tipe 2 di PDDIKTI",
            "Mengajukan Pembukaan periode tipe 1 di PDDIKTI",
            "Koordinasi dengan dikti mengenai permasalah PDDIKTI",
            "Melakukan pengajuan perubahan data mahasiswa di PDDIKTI",
            "Melakukan entry no ijazah alumni yang belum ditemukan di SIVIL",
            "Melakukan pelaporan kegiatan akademik ke pddikti",
            "Melakukan pelaporan pengajaran dosen ke pddikti",
        ],
    },
    {
        nama: "Fuji Yatiningsih",
        nip: "H.7.198904142021102001",
        password: "98914041",
        kegiatan: [
            "Mengumpulkan data untuk Laporan Tahunan - Pidato Dies - Newsletter - Undip Fact",
            "Mendesign Laporan Tahunan - Pidato Dies - Newsletter - Undip Fact",
            "Memverifikasi dan Mengecek kembali Laporan Tahunan - Pidato Dies - Newsletter - Undip Fact",
            "Menindaklanjuti permasalahan terkait sso",
            "Membuat PIN pendaftaran SSO",
            "Mereset Password SSO",
            "Membuat Email live untuk pegawai undip",
            "Mereset Email live untuk pegawai undip",
            "Membuat Domain Website",
            "Mereset Password Cpanel",
            "Monitoring Website",
            "Membuat akun zoom",
            "Menindaklanjuti permasalahan akun sso terblokir",
            "Menindaklanjuti permasalahan device terblokir saat akses sso",
            "Menindaklanjuti permasalahan kode OTP microsoft",
            "Melaksanakan perintah atasan",
            "Mengecek dan memberikan solusi web di lingkungan Undip yang bermasalah",
            "Menindaklanjuti permasalahan tidak bisa koneksi internet",
            "Menggambar diagram dengan spark EA",
        ],
    },
    {
        nama: "Sendy Ikasari Intyas Putri",
        nip: "H.7.199407112018072001",
        password: "49917011",
        kegiatan: [
            "Monitoring website Undip - BAIKABP dan DSI",
            "Mengupdate versi plugin - theme - wp dan fitur lain di web Undip - bkb dan DSI",
            "Menyelesaikan permasalahan terkait SSO - Office dll terkait TIK",
            "Membuat link zoom untuk keperluan meeting online dari unit",
            "Menyelesaikan permasalahan web prodi",
            "Menyelesaikan permasalahan web fakultas",
            "Mengerjakan perintah PPK terkait kelengkapan pengadaan untuk pembuatan draft SPPBJ - SPK - BA dan dokumen kelengkapan lainnya",
            "Koordinasi dengan penyedia terkait kelengkapan dokumen kontrak pengadaan",
            "Monitoring web prodi pada hosting 50 - 56 - 53 - 37 - hosto dan 200.",
            "Membantu menyelesaikan permasalahan web prodi pada hosting 50",
            "Membantu menyelesaikan permasalahan web prodi pada hosting 56",
            "Membantu menyelesaikan permasalahan web prodi pada hosting 59",
            "Membantu menyelesaikan permasalahan web prodi pada hosting 37",
            "Membantu menyelesaikan permasalahan web prodi pada hosting hosto",
            "Membantu menyelesaikan permasalahan web prodi pada hosting 200",
            "Menyelesaikan permasalahan autentikasi akun sso ke office365 yang bermasalah",
            "Membuat draft SK Rektor sesuai dengan arahan pimpinan",
            "Monitoring draft SK Rektor pada aplikasi HTLP dan merevisi jika ada perubahan dari pimpinan",
            "Melakukan backup manual beberapa sistem sesuai arahan pimpinan",
            "Mengarsip dokumen pengadaan, dokumen SPTJM website, dan lain-lain sesuai arahan pimpinan",
        ],
    },
    {
        nama: "Suyatno",
        nip: "196903301993031001",
        password: "96913003",
        kegiatan: [
            "pengambilan dokumen ke pimpinan Universitas",
            "memproses surat",
            "permohonan paraf dan tanda tangan Pimpinan",
            "penomoran surat dan undangan rapat ",
            "pengiriman surat dan undangan ke unit dan fak yang terkait",
            "pengarsipan surat dan undangan",
            "melaksanakan tugas pimpinan baik Supervisor - Manajer - Biro dan Pimpinan Universitas",
            "Koordinasi dengan sekreatris mengenai surat surat",
            "menyiapkan kebutuhan Alat Kerja Kantor atau ATK di Supervisor - Manajer dan Biro",
        ],
    },
    {
        nama: "Umi Latifah",
        nip: "H.7.199007132021102001",
        password: "09917031",
        kegiatan: [
            "menindaklanjuti permasalahan terkait sso secara langsung",
            "menindaklanjuti permasalahan terkait sso melalui ticketing",
            "menindaklanjuti permasalahan terkait sso melalui email",
            "membuat PIN pendaftaran SSO",
            "Mereset Password SSO",
            "Membuat Email live untuk pegawai undip",
            "Mereset Email live untuk pegawai undip",
            "Membuat Domain Website",
            "Mereset Password Cpanel",
            "Monitoring Website",
            "Monitoring Blog",
            "Menindaklanjuti permasalahan akun sso terblokir",
            "Menindaklanjuti permasalahan device sso terblokir",
            "Menindaklanjuti permasalahan perubahan NO HP untuk menerima kode OTP",
            "Melaksanakan perintah atasan",
            "Mengecek dan memberikan solusi web di lingkungan Undip yang bermasalah",
            "Menindaklanjuti permasalahan tidak bisa koneksi internet",
            "Mengumpulkan data untuk Laporan Tahunan - Pidato Dies - Newsletter dan Undip Fact",
            "menggambar diagram dengan spark EA",
            "Menindaklanjuti permasalahan mahasisawa terkait NO Ijazah belum terdaftar di sivil",
            "Membuat link zoom untuk keperluan meeting online dari unit",
        ],
    },
    {
        nama: "Andys Sandra Kurniawan",
        nip: "H.7.198705232018071001",
        password: "78915032",
        kegiatan: [
            "Monitoring Aplikasi Yang telah dibuat",
            "Membuat coding Modul Aplikasi",
            "Melaksanakan perintah atasan",
            "Memperbaiki Aplikasi yang eror",
            "Melaksanakan koordinasi dengan yang lain",
            "Membuat coding Modul Aplikasi",
            "Melakukan koordinasi mengenai pengembangan aplikasi",
            "Menganalisa masalah dalam aplikasi",
            "Menganalisa eror aplikasi",
            "Memeriksa jalannya CI aplikasi yang dibuat",
            "Mengevaluasi laporan aplikasi yang down",
            "Melakukan riset untuk pengembangan diri",
            "Menganalisa aplikasi",
            "Memperbaiki bug aplikasi sesuai laporan pengguna",
            "Mengisi waktu santai sambil musikan",
            "Diskusi dengan rekan untuk menemukan metode yang efektif",
            "Diskusi santai membahas permasalahan yang ada",
        ],
    },
    {
        nama: "Desy Purnamawati",
        nip: "197812152002122002",
        password: "87912151",
        kegiatan: [
            "Mendisposisi surat - surat masuk",
            "Menjawab dan/atau membuat kajian surat - surat masuk",
            "Mereview surat-surat yang akan didistribusikan keluar BP UBIKAR",
            "Memproses penebusan Bahan Bakar Minyak (BBM) melalui BNI Direct",
            "Menatausahakan softfile penebusan BBM Unit Usaha SPBU Undip",
            "Memverifikasi Setoran Rekapitulasi Setoran (SRS) pada aplikasi Pendapatan",
            "Rapat koordinasi internal terkait permasalahan yang urgent penyelesaian",
            "Memproses pengusulan Draft Surat Keputusan Rektor melalui Aplikasi HTLP",
            "Koordinasi bersama eksternal terkait permasalahan yang urgent penyelesaian",
            "Istirahat sejenak, melepas beban pikiran pekerjaan",
            "Memproses pencairan hasil pendapatan Usaha Komersial UPKAB pada aplikasi RSA UK",
            "Menatausahakan dokumen soft file pencairan hasil pendapatan Usaha Komersial UPKAB pada aplikasi RSA UK",
            "Memproses pencairan hasil pendapatan Usaha Komersial UPKAB pada aplikasi BNI Direct",
            "Menatausahakan dokumen soft file pencairan hasil pendapatan Usaha Komersial UPKAB pada aplikasi BNI Direct",
            "Koordinasi persiapan paparan materi/bahan rapat pimpinan",
            "Melaksanakan tugas kedinasan lainnya yang diinstruksikan pimpinan",
            "Menyusun SKP Catatan Kinerja Harian",
            "Monitoring dan Verifikasi Kinerja harian staf",
        ],
    },
];

let gen_nums = [];

function in_array(array, el) {
    for (var i = 0; i < array.length; i++) if (array[i] == el) return true;
    return false;
}

function get_rand(array) {
    var rand = array[Math.floor(Math.random() * array.length)];
    if (!in_array(gen_nums, rand)) {
        gen_nums.push(rand);
        return rand;
    }
    return get_rand(array);
}

async function main() {
    let delayInMillisecondsPeg = 20000; //1 second

    // check if sunday or saturday
    const date = new Date();
    const day = date.getDay();
    if (day === 0 || day === 6) {
        process.stdout.write("today is weekend, no need to run this script");
        return;
    }

    pegawai.forEach(async (peg, i_peg) => {
        setTimeout(async () => {
            process.stdout.write("nama : " + peg.nama + " \n");
            process.stdout.write("getting token... \n");
            // const token = await api_function.getToken();
            const token = await api_function.getTokenSingle(
                peg.nip,
                peg.password
            );

            if (token.status === "error") {
                process.stdout.write("ERROR getting token: \n");
                process.stdout.write(token.message);
                return;
            }

            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            day = ("0" + day).slice(-2);
            month = ("0" + month).slice(-2);

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${year}-${month}-${day}`;
            // console.log(currentDate); // "2022-12-29"

            let tanggal_logbook = currentDate;

            process.stdout.write("logbook tgl : " + tanggal_logbook + " \n");
            process.stdout.write("processing :  \n");

            let array_angka = [];
            for (let ix = 0; ix < peg.kegiatan.length; ix++) {
                array_angka.push(ix);
            }

            gen_nums = [];

            for (let ix = 0; ix < peg.kegiatan.length; ix++) {
                get_rand(array_angka);
                // setTimeout(async () => {
                //     get_rand(peg.kegiatan);
                // }, ix * 1000);
            }

            // console.log(peg.kegiatan[gen_nums[0]]);
            // return;

            let delayInMilliseconds = 1000; //1 second

            jam_mulai.forEach(async (v, i) => {
                setTimeout(async () => {
                    process.stdout.write("jam_mulai : " + v + " \n");
                    process.stdout.write(
                        "jam_selesai : " + jam_akhir[i] + " \n"
                    );

                    let uraian_aktivitas = peg.kegiatan[gen_nums[i]];

                    let data = {
                        tanggal_logbook: tanggal_logbook,
                        uraian_aktivitas: uraian_aktivitas,
                        waktu_mulai: v,
                        waktu_selesai: jam_akhir[i],
                        jumlah_satuan: "1",
                        idjeniskegiatan: "1",
                        output: "kegiatan",
                    };

                    const result = await api_function.postLogbook(
                        token,
                        data,
                        false
                    );
                }, i * delayInMilliseconds);
            });
        }, i_peg * delayInMillisecondsPeg);
    });

    process.stdout.write("SELESAI \n");
}

main();
