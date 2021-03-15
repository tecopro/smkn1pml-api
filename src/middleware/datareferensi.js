const axios = require('axios').default
const cheerio = require('cheerio')
const { URL } = require('url')

const npsn = process.env.NPSN
const targetUrl = 'https://referensi.data.kemdikbud.go.id/tabs.php?npsn=' + npsn
const { hostname } = new URL(targetUrl)

module.exports = datareferensi = () => {
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

            // Identitas Satuan Pendidikan / Lembaga
            let identitas = []
            let tabs1 = $('#tabs-1 table td')
            tabs1 = tabs1.first().find('table tr')
            tabs1.each((number, element) => {
                let thisRow = []
                let tableData = $(element).find('td')

                if (tableData.length > 0) {
                    tableData.each((number, element) => {
                        thisRow.push(
                            $(element).text().trim()
                        )
                    })

                    identitas.push(thisRow)
                }
            })
            identitas = identitas.map(value => value.filter(value => value !== '' && value !== ':')).filter(value => value.length > 0)

            // Dokumen dan Perijinan
            let perijinan = []
            let tabs2 = $('#tabs-2 table')
            tabs2 = tabs2.eq(1).find('tr')
            tabs2.each((number, element) => {
                let thisRow = []
                let tableData = $(element).find('td')

                if (tableData.length > 0) {
                    tableData.each((number, element) => {
                        let aHref = $(element).find('a')

                        if (aHref.length) {
                            thisRow.push(aHref.attr('href'))
                        } else {
                            thisRow.push($(element).text().trim())
                        }
                    })

                    perijinan.push(thisRow)
                }
            })
            perijinan = perijinan.map(value => value.filter(value => value !== '' && value !== ':')).filter(value => value.length > 0)

            // Sarana Prasarana
            let sarpras = []
            let tabs3 = $('#tabs-3 table tr')
            tabs3.each((number, element) => {
                let thisRow = []
                let tableData = $(element).find('td')

                if (tableData.length > 0) {
                    tableData.each((number, element) => {
                        thisRow.push(
                            $(element).text().trim()
                        )
                    })

                    sarpras.push(thisRow)
                }
            })
            sarpras = sarpras.map(value => value.filter(value => value !== '' && value !== ':')).filter(value => value.length > 0)

            // Kontak
            let kontak = []
            let tabs4 = $('#tabs-6 table tr')
            tabs4.each((number, element) => {
                let thisRow = []
                let tableData = $(element).find('td')

                if (tableData.length > 0) {
                    tableData.each((number, element) => {
                        thisRow.push(
                            $(element).text().trim()
                        )
                    })

                    kontak.push(thisRow)
                }
            })
            kontak = kontak.map(value => value.filter(value => value !== '' && value !== ':')).filter(value => value.length > 0)

            // Map
            let script = $('script').last().html()
            script = script.split('L.marker([')[1]
            script = script.split(']).addTo(mymap)')[0]
            let coordinates = script.split(',')
            let lat = coordinates[0]
            let lng = coordinates[1]

            // 
            let data = {
                identitas: {
                    nama: identitas[0][1],
                    npsn: identitas[1][1],
                    alamat: {
                        jalan: identitas[2][1],
                        kodepos: identitas[3][1],
                        kelurahan: identitas[4][1],
                        kecamatan: identitas[5][1],
                        kabupaten: identitas[6][1],
                        provinsi: identitas[7][1]
                    },
                    status: identitas[8][1],
                    penyelenggaraan: identitas[9][1],
                    jenjang: identitas[10][1]
                },
                perijinan: {
                    naungan: perijinan[0][1],
                    sk: {
                        pendirian: {
                            no: perijinan[1][1],
                            tanggal: perijinan[2][1]
                        },
                        operasional: {
                            no: perijinan[3][1],
                            tanggal: perijinan[4][1],
                            file: perijinan[5][1]
                        },
                        akreditasi: {
                            no: perijinan[7][1],
                            tanggal: perijinan[8][1]
                        }
                    },
                    akreditasi: perijinan[6][1],
                    iso: perijinan[9][1]
                },
                sarpras: {
                    tanah: sarpras[0][1],
                    internet: sarpras[1][1],
                    listrik: sarpras[2][1]
                },
                kontak: {
                    fax: kontak[0][1],
                    email: kontak[1][1],
                    website: kontak[2][1]
                },
                koordinat: {
                    lat,
                    lng
                }
            }
            resolve(data)

        }).catch(reject)
    })
}