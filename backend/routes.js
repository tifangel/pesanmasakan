'use strict';

module.exports = function(app) {
    var pesanmasakan = require('./controller');

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to pesanmasakan application." });
      });

    app.route('/daftarwarung')
        .get(pesanmasakan.daftar_warung);

    app.route('/daftarwarung/:id')
        .get(pesanmasakan.lihat_warung);

    app.route('/cariwarung')
        .get(pesanmasakan.cari_warung);

    app.route('/categories')
        .get(pesanmasakan.lihat_kategori);
        
    app.route('/daftarmenu')
        .get(pesanmasakan.daftar_menu);
    // query params : id_warung
    
    app.route('/daftarmenu/:id')
        .get(pesanmasakan.lihat_menu);

    app.route('/carimenu')
        .get(pesanmasakan.cari_menu);

    app.route('/daftarharimenu')
        .get(pesanmasakan.daftar_hari_menu);

    app.route('/editdatawarung')
       .post(pesanmasakan.ubah_data_warung);

    app.route('/tambahwarung')
       .post(pesanmasakan.tambah_warung);

    app.route('/hapuswarung')
       .post(pesanmasakan.hapus_warung);
};