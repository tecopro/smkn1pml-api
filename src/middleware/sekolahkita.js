const axios = require('axios').default
const cheerio = require('cheerio')
const { URL } = require('url')
const { cleanArray } = require('./../helper')

const idSekolahKita = process.env.SEKOLAHKITA
const targetUrl = 'http://sekolah.data.kemdikbud.go.id/index.php/chome/profil/' + idSekolahKita
const { hostname } = new URL(targetUrl)

module.exports = sekolahkita = () => {
    return new Promise((resolve, reject) => {
        axios.get(targetUrl, {
            headers: {
                'Accept': 'application/json, text/javascript, */*;',
                'Host': hostname,
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0',
                'Origin': targetUrl,
                'Referer': targetUrl
            }
        }).then((response) => {

            const body = response.data
            const $ = cheerio.load(body)

            // alamat sekolah
            $('.page-header small a').remove()
            let alamat = $('.page-header small').text().trim()

            // nama sekolah
            let headerTitle = $('.page-header').html()
            let namaSekolah = headerTitle.replace(/\(([^)]+)\)/, '').trim()
            namaSekolah = namaSekolah.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '')

            // npsn sekolah
            let npsn = /\(([^)]+)\)/.exec(headerTitle)[1].trim()

            // gambar slider
            let gambarSlider = []
            $('div[data-u="slides"] img[data-u="image"]').each((i, elem) => {
                gambarSlider.push(elem.attribs.src)
            })

            // kepala sekolah
            let kepalaSekolah = $('.box-profile > ul > li:nth-child(3)').text().split(':')[1].trim()

            // operator sekolah
            let operator = $('.box-profile > ul > li:nth-child(4)').text().split(':')[1].trim()

            // pisahin kolom-kolomnya dulu :D
            let col_satu = $('.container > .row > div:nth-child(4) > .row > div:first-child').text().split(':')
            let col_dua = $('.container > .row > div:nth-child(4) > .row > div:nth-child(2)').text().trim().replace(/\t/g, '').split(`\n`)
            let col_tiga = $('.container > .row > div:nth-child(4) > .row > div:nth-child(3)').text().trim().replace(/\t/g, '').split(`\n`)
            let col_empat = $('.container > .row > div:nth-child(4) > .row > div:nth-child(4)').text().split(':')

            // warga sekolah
            let jumlahGuru = col_satu[1].replace(/\D/g, '')
            jumlahGuru = Number(jumlahGuru)
            let siswaCowo = col_satu[2].replace(/\D/g, '')
            siswaCowo = Number(siswaCowo)
            let siswaCewe = col_satu[3].replace(/\D/g, '')
            siswaCewe = Number(siswaCewe)
            let jumlahSiswa = (siswaCowo + siswaCewe)

            // rombongan belajar
            let rombonganBelajar = col_satu[4].replace(/\D/g, '')
            rombonganBelajar = Number(rombonganBelajar)

            // sistem pembelajaran
            col_dua = cleanArray(col_dua)
            let kurikulum = col_dua[0].split(':')[1].trim()
            let penyelenggaraan = col_dua[1].split(':')[1].trim()
            let berbasisSekolah = (
                $('.container > .row > div:nth-child(4) > .row > div:nth-child(2) > .glyphicon-check').length ? true : false
            )
            let semesterData = col_dua[3].split(':')[1].trim()

            // aset tetap
            col_tiga = cleanArray(col_tiga)
            let aksesInternet = (
                $('.container > .row > div:nth-child(4) > .row > div:nth-child(3) > .glyphicon-check').first().length ? true : false
            )
            let sumberListrik = (
                $('.container > .row > div:nth-child(4) > .row > div:nth-child(3) > .glyphicon-check').last().length ? true : false
            )
            let dayaListrik = sumberListrik ? col_tiga[2].split(':')[1].trim() : false
            let luasTanah = col_tiga[3].split(':')[1].trim()

            // ruangan
            let ruangKelas = col_empat[1].replace(/\D/g, '')
            ruangKelas = Number(ruangKelas)
            let laboratorium = col_empat[2].replace(/\D/g, '')
            laboratorium = Number(laboratorium)
            let perpustakaan = col_empat[3].replace(/\D/g, '')
            perpustakaan = Number(perpustakaan)
            let sanitasiSiswa = col_empat[4].replace(/\D/g, '')
            sanitasiSiswa = Number(sanitasiSiswa)

            // akreditasi
            let colAkreditasi = $('#dataakreditasi > div > div').eq(1).find('ul > li')
            let tahunAkreditasi = colAkreditasi.eq(2).text().split(':')[1].trim()
            tahunAkreditasi = Number(tahunAkreditasi)
            let akreditasi = colAkreditasi.eq(4).text().split(':')[1].trim()

            // 
            let data = {
                sekolah: {
                    nama: namaSekolah,
                    npsn,
                    alamat,
                    kepala_sekolah: kepalaSekolah
                },
                warga: {
                    operator,
                    guru: jumlahGuru,
                    siswa: {
                        laki_laki: siswaCowo,
                        perempuan: siswaCewe,
                        total: jumlahSiswa
                    }
                },
                rombongan_belajar: rombonganBelajar,
                kurikulum,
                penyelenggaraan,
                manajemen_berbasis_sekolah: berbasisSekolah,
                semester_data: semesterData,
                aset_tetap: {
                    akses_internet: aksesInternet,
                    sumber_listrik: sumberListrik,
                    daya_listrik: dayaListrik,
                    luas_tanah: luasTanah
                },
                ruangan: {
                    kelas: ruangKelas,
                    laboratorium,
                    perpustakaan
                },
                sanitasi_siswa: sanitasiSiswa,
                akreditasi: {
                    nilai: akreditasi,
                    tahun: tahunAkreditasi
                }
            }
            resolve(data)

        }).catch(reject)
    })
}