const axios = require('axios').default,
    cheerio = require('cheerio'),
    fs = require('fs')

let sekolahkita = 'http://sekolah.data.kemdikbud.go.id/index.php/chome/profil/8FC33D89-8B48-4D18-A696-8A185876E2C9'

axios.get(sekolahkita, {
    headers: {
        'Accept': 'application/json, text/javascript, */*;',
        'Host': 'sekolah.data.kemdikbud.go.id',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0',
        'Origin': sekolahkita,
        'Referer': sekolahkita
    }
}).then((response) => {
    let body = response.data,
        $ = cheerio.load(body)

    // alamat
    $('.page-header small a').remove()
    let alamat = $('.page-header small').text().trim()
    // nama sekolah & npsn
    $('.page-header small').remove()
    let school_npsn = $('.page-header').html(),
        npsn = /\(([^)]+)\)/.exec(school_npsn)[1].trim(),
        nama = school_npsn.replace(/\(([^)]+)\)/, '').trim()
    // images
    let slides = [];
    $('div[data-u="slides"] img[data-u="image"]').each((i, elem) => {
        slides.push(elem.attribs.src)
    })
    // akreditasi
    let akreditasi = $('.box-profile > ul > li:nth-child(2)').text().split(':')[1].trim()
    // kepsek
    let kepsek = $('.box-profile > ul > li:nth-child(3)').text().split(':')[1].trim()
    // operator
    let operator = $('.box-profile > ul > li:nth-child(4)').text().split(':')[1].trim()
    // penghuni wkwk
    let satu = $('.container > .row > div:nth-child(4) > .row > div:first-child').text().split(':'),
        guru = satu[1].replace(/\D/g, ''),
        cowo = satu[2].replace(/\D/g, ''),
        cewe = satu[3].replace(/\D/g, ''),
        total = (cowo + cewe),
        rombel = satu[4].replace(/\D/g, '')
    // detail pendidikan
    let dua = $('.container > .row > div:nth-child(4) > .row > div:nth-child(2)').text().trim().replace(/\t/g, '').split(`\n`),
        dua_filtered = clean_array(dua),
        kurikulum = dua_filtered[0].split(':')[1].trim(),
        jam_ajar = dua_filtered[1].split(':')[1].trim(),
        // mbs = manajemen berbasis sekolah
        mbs = ($('.container > .row > div:nth-child(4) > .row > div:nth-child(2) > .glyphicon-check').length) ? true : false,
        semester = dua_filtered[3].split(':')[1].trim()
    // kelengkapan
    let tiga = $('.container > .row > div:nth-child(4) > .row > div:nth-child(3)').text().trim().replace(/\t/g, '').split(`\n`),
        tiga_filtered = clean_array(tiga),
        internet = ($('.container > .row > div:nth-child(4) > .row > div:nth-child(3) > .glyphicon-check').first().length) ? true : false,
        listrik = ($('.container > .row > div:nth-child(4) > .row > div:nth-child(3) > .glyphicon-check').last().length) ? true : false,
        daya = (listrik) ? tiga_filtered[2].split(':')[1].trim() : false,
        tanah = tiga_filtered[3].split(':')[1].trim()
    // fasilitas
    let empat = $('.container > .row > div:nth-child(4) > .row > div:nth-child(4)').text().split(':'),
        rkelas = empat[1].replace(/\D/g, ''),
        lab = empat[2].replace(/\D/g, ''),
        perpus = empat[3].replace(/\D/g, ''),
        // ss = sanitasi siswa
        ss = empat[4].replace(/\D/g, '')
    // akreditasi (ban)
    let ban_container = $('#dataakreditasi > div > div').eq(1).find('ul > li'),
        ban = {
            tahun: ban_container.eq(2).text().split(':')[1].trim(),
            akreditasi: ban_container.eq(4).text().split(':')[1].trim()
        }

    // save data
    let data = {
        nama_sekolah: nama,
        npsn: npsn,
        alamat_lengkap: alamat,
        gambar: slides,
        kepala_sekolah: kepsek,
        operator: operator,
        jumlah_guru: guru,
        siswa_laki: cowo,
        siswa_perempuan: cewe,
        jumlah_siswa: total,
        rombongan_belajar: rombel,
        kurikulum: kurikulum,
        penyelenggaraan: jam_ajar,
        manajemen_berbasis_sekolah: mbs,
        semester_data: semester,
        akses_internet: internet,
        sumber_listrik: listrik,
        daya_listrik: daya,
        luas_tanah: tanah,
        ruang_kelas: rkelas,
        laboratorium: lab,
        perpustakaan: perpus,
        sanitasi_siswa: ss,
        akreditasi: ban
    }
    fs.writeFileSync(__dirname + '/../data/school.json', JSON.stringify(data))
})

const clean_array = (actual) => {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}