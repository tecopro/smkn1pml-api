var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function initialSetup() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet(e) {
    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
        var sheet = doc.getSheetByName(sheetName)

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
        var allData = sheet.getDataRange().getValues()

        var results = []
        if (allData.length > 1) {

            var records = sheet.getRange(2, 1, (sheet.getLastRow() - 1), sheet.getLastColumn()).getValues()
            for (r in records) {
                var record = records[r]
                var oneData = {}

                for (i in record) {
                    oneData[headers[i]] = record[i]
                }

                results.push(oneData)
            }

            results = results.filter(value => value.deleted_at === 0)
            for (d in results) {
                delete results[d].deleted_at
            }

        }

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'data': results }))
            .setMimeType(ContentService.MimeType.JSON)
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON)
    }
}

function doPost(e) {
    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
        var sheet = doc.getSheetByName(sheetName)

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
        var allData = sheet.getDataRange().getValues()

        allData.splice(0, 1)
        var results = []
        var action = e.parameter.action

        if (action === undefined) {

            var newId = sheet.getLastRow()
            var nextRow = newId + 1
            var created = new Date().getTime()

            var newRow = headers.map(header => (header === 'id' ? newId : (
                header === 'created_at' ? created : (
                    header === 'updated_at' ? created : (
                        header === 'deleted_at' ? 0 : e.parameter[header]
                    )
                )
            )))

            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

            var results = {}
            for (r in newRow) {
                if (headers[r] !== 'deleted_at') {
                    results[headers[r]] = newRow[r]
                }
            }

        } else if (action === 'change') {

            if (allData.length > 0) {
                var data = []

                for (d in allData) {
                    var record = allData[d]
                    var oneData = {}

                    for (i in record) {
                        if (headers[i] !== 'deleted_at') {
                            oneData[headers[i]] = record[i]
                        }
                    }

                    data.push(oneData)
                }

                var id = Number(e.parameter.id)
                var edited = new Date().getTime()
                var editedRow = {}

                for (i in data) {
                    var row = data[i]
                    var rowId = (Number(i) + 2)

                    if (Number(row.id) === id) {
                        var updateIndex = (Number(headers.indexOf('updated_at')) + 1)
                        sheet.getRange(rowId, updateIndex).setValue(edited)

                        Object.keys(e.parameter).forEach(function (key) {
                            if (key != 'id' && key != 'action') {
                                var paramIndex = (Number(headers.indexOf(key)) + 1)
                                sheet.getRange(rowId, paramIndex).setValue(e.parameter[key])
                            }
                        })

                        editedRow = row
                    }
                }

                var results = editedRow

            }

        } else if (action === 'remove') {

            if (allData.length > 0) {
                var data = []

                for (d in allData) {
                    var record = allData[d]
                    var oneData = {}

                    for (i in record) {
                        if (headers[i] !== 'deleted_at') {
                            oneData[headers[i]] = record[i]
                        }
                    }

                    data.push(oneData)
                }

                var id = Number(e.parameter.id)
                var deleted = new Date().getTime()
                var deletedRow = {}

                for (i in data) {
                    var row = data[i]
                    var rowId = (Number(i) + 2)

                    if (Number(row.id) === id) {
                        var updateIndex = (Number(headers.indexOf('deleted_at')) + 1)
                        sheet.getRange(rowId, updateIndex).setValue(deleted)

                        deletedRow = row
                    }
                }

                var results = deletedRow

            }

        }

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'data': results }))
            .setMimeType(ContentService.MimeType.JSON)
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON)
    }
}