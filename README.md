# Rest API
Hanya Restful API sederhana yang digunakan oleh website [smkn1pml.sch.id](https://smkn1pml.sch.id/)

## Instalasi

1. Clone repositori ini
   ```
   git clone https://github.com/tecopro/smkn1pml-api.git
   ```

2. Install dependencies
   ```
   npm i --save
   ```

3. Jalankan server
   - Mode pengembangan
    
    ```
    npm run dev
    ```

   - Mode produksi
    
    ```
    npm run start
    ```

## Endpoint

| Endpoint  | Deskripsi                                                                         |
| --------- | --------------------------------------------------------------------------------- |
| `/school` | Detail informasi berdasarkan [Sekolah Kita](http://sekolah.data.kemdikbud.go.id/) |
| `/wish`   | Daftar keinginan siswa & guru SMK (pengumpulan data saat diesnatalis)             |
| `...`     | Segera hadir beberapa Endpoint lagi                                               |
