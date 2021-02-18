'use strict';

module.exports = function(app) {
    var pesanmasakan = require('./controller');

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to pesanmasakan application." });
      });

    app.route('/daftarwarung')
        .get(pesanmasakan.daftar_warung);

    app.route('/cariwarung')
        .get(pesanmasakan.cari_warung);
};