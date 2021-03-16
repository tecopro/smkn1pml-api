# Google Spreadsheet untuk Database

Memanfaatkan Google Spreadsheet dan _Google Apps Script_ sebagai database.<br>
Mendukung CRUD (_Create_, _Read_, _Update_, _Delete_)

## Format Spreadsheet

|       |   A   |   B   |   C   |     C      |     D      |     E      |
| :---: | :---: | :---: | :---: | :--------: | :--------: | :--------: |
|   1   |  id   |  ...  |  ...  | created_at | updated_at | deleted_at |

### Contoh

|       |   A   |   B   |   C   |   D   |    E    |     F      |     G      |     H      |
| :---: | :---: | :---: | :---: | :---: | :-----: | :--------: | :--------: | :--------: |
|   1   |  id   | name  | email |  url  | message | created_at | updated_at | deleted_at |

## Google Apps Script

Lihat di file [Code.gs](Code.gs)

## Trigger

`GET`

![doGet](trigger-1.png "doGet()")

`POST`

![doPost](trigger-2.png "doPost(e)")

# Referensi

- [jamiewilson/form-to-google-sheets](https://github.com/jamiewilson/form-to-google-sheets)
- [NGOBAR#29 WPU](https://www.youtube.com/watch?v=2XosKncBoQ4)