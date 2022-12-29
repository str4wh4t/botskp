const reader = require('xlsx')
  

const parse_excel = async (file) => {
    const workbook = reader.readFile(file);

    const sheet_name_list = workbook.SheetNames;

    // iterate through all rows, skip 4 first rows
    var row = 6;
    var data = [];
    while (workbook.Sheets[sheet_name_list[0]]['A' + row] != undefined) {
        var entry_data = {
            tanggal_logbook: workbook.Sheets[sheet_name_list[0]]['A' + row] ? workbook.Sheets[sheet_name_list[0]]['A' + row].v : null,
            waktu_mulai: workbook.Sheets[sheet_name_list[0]]['B' + row] ? workbook.Sheets[sheet_name_list[0]]['B' + row].v+':00' : null,
            waktu_selesai: workbook.Sheets[sheet_name_list[0]]['C' + row] ? workbook.Sheets[sheet_name_list[0]]['C' + row].v+':00' : null,
            uraian_aktivitas: workbook.Sheets[sheet_name_list[0]]['D' + row] ? workbook.Sheets[sheet_name_list[0]]['D' + row].v : null,
            output: workbook.Sheets[sheet_name_list[0]]['E' + row] ? workbook.Sheets[sheet_name_list[0]]['E' + row].v : null,
            jumlah_satuan: workbook.Sheets[sheet_name_list[0]]['F' + row] ? workbook.Sheets[sheet_name_list[0]]['F' + row].v : null,
            idjeniskegiatan: workbook.Sheets[sheet_name_list[0]]['G' + row] ? workbook.Sheets[sheet_name_list[0]]['G' + row].v : null,
        }

        // remove null value
        for (var key in entry_data) {
            if (entry_data[key] == null) {
                delete entry_data[key];
            }
        }

        
        data.push(entry_data);
        row++;
    }

    return data;
}


module.exports = {
    parse_excel
}
