'use strict';

module.exports = function(app) {
    var pesanmasakan = require('./controller');
    var auth = require('./controllerAuthentication');

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to pesanmasakan application." });
      });
    
    // WARUNG
    app.route('/daftarwarung')
        .get(pesanmasakan.daftar_warung);

    app.route('/daftarwarung/:id')
        .get(pesanmasakan.lihat_warung);

    app.route('/cariwarung')
        .get(pesanmasakan.cari_warung);

    app.route('/categories')
        .get(pesanmasakan.lihat_kategori);

    app.route('/editdatawarung')
        .post(pesanmasakan.ubah_data_warung);
 
     app.route('/tambahwarung')
        .post(pesanmasakan.tambah_warung);
 
     app.route('/hapuswarung')
        .post(pesanmasakan.hapus_warung);
    
    // MENU
    app.route('/daftarmenu')
        .get(pesanmasakan.daftar_menu);
    // query params : id_warung
    
    app.route('/daftarmenu/:id')
        .get(pesanmasakan.lihat_menu);

    app.route('/carimenu')
        .get(pesanmasakan.cari_menu);

    app.route('/daftarharimenu')
        .get(pesanmasakan.daftar_hari_menu);

    app.route('/tambahmenu')
        .post(pesanmasakan.add_menu);

    app.route('/deletemenu')
        .post(pesanmasakan.delete_menu);

    app.route('/updatemenu')
        .post(pesanmasakan.update_menu);
    
    // USER
    app.route('/getuser')
        .post(auth.get_auth);   
    app.route('/myprofile')
        .get(auth.get_my_profile);
    app.route('/registerpembeli')
        .post(auth.add_user_customer);
    app.route('/registerpenjual')
        .post(auth.add_user_warung);
    
    // ORDER
    app.route('/cooklist/:id')
        .get(pesanmasakan.get_cooklist);
        // params: id warung

    // the following routes has status as an attribute
    // 0 = in process / cooking
    // 1 = completed / sent
    // 2 = cancelled
    app.route('/orderlist/penjual/:id')
        .get(pesanmasakan.orderlist_penjual);

    app.route('/history/penjual/:id')
        .get(pesanmasakan.history_penjual);

    app.route('/orderlist/pembeli/:id')
        .get(pesanmasakan.orderlist_pembeli);

    app.route('/tambahorder')
        .post(pesanmasakan.add_order);

    app.route('/updateorder')
        .post(pesanmasakan.update_order);

    app.route('/updateordermenu')
        .post(pesanmasakan.update_ordermenu);

    app.route('/overvieworder/:id')
        .get(pesanmasakan.overview_order);

    app.route('/ordersummary/:id')
        .get(pesanmasakan.ordersummary);
};