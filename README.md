# Rest API SMK

Hanya Restful API sederhana yang digunakan oleh website [smkn1pml.sch.id](https://smkn1pml.sch.id/)

## Instalasi

1. Clone repositori ini
   ```
   git clone https://github.com/tecopro/smkn1pml-api.git
   ```

2. Install dependencies
   ```
   npm install --save
   ```

3. Jalankan server
   - Live Reload
      ```
      npm run dev
      ```

   - Normal
      ```
      npm run start
      ```

## Endpoint

| Endpoint   | Deskripsi                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/school`  | Detail data sekolah berdasarkan [Sekolah Kita](http://sekolah.data.kemdikbud.go.id/) dan [Data Referensi](http://referensi.data.kemdikbud.go.id/) |
| `/contact` | Pengumpulan pesan masuk (kontak) dari website                                                                                                     |
| `/wish`    | Daftar keinginan siswa & guru SMK (pengumpulan data saat diesnatalis)                                                                             |
| `...`      | Segera hadir beberapa Endpoint lagi                                                                                                               |
