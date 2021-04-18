'use strict';

var response = require('./response');
var connection = require('./db');

exports.daftar_warung = function(req, res) {
    connection.query('SELECT * FROM warung', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.lihat_warung = function(req, res) {
    connection.query("SELECT * FROM warung WHERE id = " + req.params.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.cari_warung = function(req,res, next) {
    const title = req.query.title;
    const location = req.query.location;

    connection.query("SELECT * FROM warung WHERE nama LIKE '%" + title + "%' AND alamat LIKE '%" + location + "%'", function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.lihat_kategori = function(req, res) {
    const category = req.query.category;

    connection.query("SELECT DISTINCT kategori FROM warung", function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
}


exports.daftar_menu = function(req, res) {
    const sql = req.query.id_warung? `SELECT * FROM menu WHERE id_warung=${req.query.id_warung}` : 'SELECT * FROM menu';
    connection.query(sql, async function (error, rows, fields){
        if(error){
            console.log("daftar menu", error)
        } else{
            var full_menu = await hari_menu(rows);
            response.ok(full_menu, res)
        }
    });
};

exports.lihat_menu = function(req, res) {
    connection.query("SELECT * FROM menu WHERE id = " + req.params.id, async function (error, rows, fields){
        if (error){
            console.log("lihat menu", error)
        } else {
            var full_menu = await hari_menu(rows);
            response.ok(full_menu, res)
        }
    });
};

exports.cari_menu = function(req,res, next) {
    const title = req.query.title;

    connection.query("SELECT * FROM menu WHERE nama LIKE '%" + title + "%'", async function (error, rows, fields){
        if(error){
            console.log("cari menu", error)
        } else{
            var full_menu = await hari_menu(rows);
            response.ok(full_menu, res);
        }
    });
};

exports.daftar_hari_menu = function(req, res) {
    connection.query("SELECT hari FROM hari_menu WHERE id_menu = " + req.query.id, async function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

var hari_menu = async function(menu) {
    var promises = [];
    for (var i = 0; i < menu.length; i++) {
        const m = menu[i];
        promises.push(new Promise((resolve, reject) => {
            var query = `SELECT hari FROM hari_menu WHERE id_menu = ${m.id}`;
            connection.query(query, (error, rows, field) => {
                if (error) reject(error);
                else {
                    var hari = [];
                    for (var i = 0; i < rows.length; i++) {
                        hari.push(rows[i].hari);
                    }
                    m.hari = hari;
                    resolve(m);
                }
            });
        }));
    }
    return Promise.all(promises).then((values) => values).catch((error) => console.log(error));
}

exports.add_menu = function(req,res){
    const id_warung = req.body.id_warung;
    const nama = req.body.nama;
    const harga = parseInt(req.body.harga);
    const desc_menu = req.body.desc_menu;
    const pic = req.body.pic;
    const hari = req.body.hari;

    const query_add_menu = 'INSERT INTO menu (id_warung, nama, harga, desc_menu, pic) VALUES (' + id_warung + ', "' + nama + '", ' + harga + ', "' + desc_menu + '", "' + pic + '")';
    connection.query(query_add_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            var id_menu = rows.insertId

            let query_add_hari_menu = 'INSERT INTO hari_menu (id_menu, hari) VALUES '
            for (var i=0; i < hari.length; i++){
                query_add_hari_menu += '(' + id_menu + ', "' + hari[i] + '")' 
                if(i < hari.length-1){
                    query_add_hari_menu += ', '
                }    
            }
            connection.query(query_add_hari_menu, function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok(rows, res)
                }
            })
        }
    });
}

exports.delete_menu = function(req, res){
    const id_menu = req.body.id;

    const query_delete_menu = "UPDATE menu SET id_warung=NULL WHERE id = " + id_menu
    connection.query(query_delete_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.update_menu = function(req,res){
    const id_menu = req.body.id;
    const nama = req.body.nama;
    const harga = req.body.harga;
    const desc_menu = req.body.desc_menu;
    const pic = req.body.pic;
    const hari = req.body.hari;

    const query_update_menu = 'UPDATE menu SET nama = "' + nama + '", harga = ' + harga + ', desc_menu = "' + desc_menu + '", pic = "' + pic + '" WHERE id = ' + id_menu
    connection.query(query_update_menu, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            const query_delete_hari_menu = "DELETE FROM hari_menu WHERE id_menu = " + id_menu
            connection.query(query_delete_hari_menu, function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    let query_add_hari_menu = 'INSERT INTO hari_menu (id_menu, hari) VALUES '
                    for (var i=0; i < hari.length; i++){
                        query_add_hari_menu += '(' + id_menu + ', "' + hari[i] + '")' 
                        if(i < hari.length-1){
                            query_add_hari_menu += ', '
                        }    
                    }
                    connection.query(query_add_hari_menu, function (error, rows, fields){
                        if(error){
                            console.log(error)
                        } else{
                            response.ok(rows, res)
                        }
                    })
                }
                
            })
        }
    });
}


exports.ubah_data_warung = function(req,res){
    const username = req.body.username
    const id_warung = req.body.id_warung
    const nama_warung = req.body.nama_warung
    const nama_owner = req.body.nama_owner
    const no_hp = req.body.no_hp
    const email = req.body.email
    const alamat = req.body.alamat
    const kategori = req.body.kategori
    const pic = req.body.pic

    console.log(req.body)
    const query_update_warung = 'UPDATE warung, user_penjual SET warung.nama = "' + nama_warung + '", warung.alamat = "' + alamat + '", warung.kategori = "' + kategori + '", warung.pic = "' + pic + 
                                '", user_penjual.nama = "' + nama_owner + '", user_penjual.email = "' + email + '", user_penjual.no_hp = "' + no_hp +
                                '" WHERE user_penjual.id_warung = warung.id AND warung.id = ' + id_warung
    console.log(query_update_warung)

    connection.query(query_update_warung, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.tambah_warung = function(req,res){
    connection.query('INSERT INTO warung (nama,alamat,kategori,pic,latitude,longitude) VALUES ("' + 
                     req.body.nama + '", "' + req.body.alamat + '", "' + req.body.cat + '", "' + req.body.pic + '", ' + parseFloat(req.body.lat) + ', ' + parseFloat(req.body.long) + 
                     ')', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.hapus_warung = function(req,res){
    connection.query("DELETE FROM warung WHERE id=" + req.body.id, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.get_cooklist = function(req, res) {
    const id = req.params.id;
    const query = `

        SELECT DATE(t.tgl_kirim) as tanggal, m.id, m.nama, SUM(tm.jumlah_porsi) as qty, m.id
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (tm.id_transaksi = t.id)
        WHERE m.id_warung = ${id} AND tm.status = 0
        GROUP BY tanggal, m.nama, m.id;
    `;

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Get cooklist", error);
        else response.ok(rows, res);
    });
}

exports.orderlist_penjual = function(req, res) {
    const id = req.params.id;
    const query = `
        SELECT id, username_pembeli, tgl_kirim, alamat_tujuan, total, status, id_warung
        FROM transaksi
        WHERE id_warung = ${id} and status = 0
        ORDER BY tgl_kirim;
    `;
    console.log(query);

    connection.query(query, async (error, rows, field) => {
        if (error) console.log("Orderlist penjual", error);
        else {
            console.log(rows);
            var details = await orderlist_details(rows);
            response.ok(details, res);
        }

    });
}

exports.history_penjual = function(req, res) {
    const id = req.params.id;
    const query = `
        SELECT id, username_pembeli, tgl_kirim, alamat_tujuan, total, status, id_warung
        FROM transaksi
        WHERE id_warung = ${id} and (status = 1 OR status = 2)
        ORDER BY tgl_kirim DESC;
    `;
    console.log(query);

    connection.query(query, async (error, rows, field) => {
        if (error) console.log("History penjual", error);
        else {
            console.log(rows);
            var details = await orderlist_details(rows);
            response.ok(details, res);
        }

    });
}

var orderlist_details = async function(rows) {
    var promises = [];
    for (var i = 0; i < rows.length; i++) {
        const row = rows[i];
        promises.push(new Promise((resolve, reject) => {
            var date = ("0" + row.tgl_kirim.getDate()).slice(-2);
            var month = ("0" + (row.tgl_kirim.getMonth() + 1)).slice(-2);
            var year = row.tgl_kirim.getFullYear();
            var hour = row.tgl_kirim.getHours();
            var mins = row.tgl_kirim.getMinutes();
            var secs = row.tgl_kirim.getSeconds();
            var tgl = `${year}-${month}-${date} ${hour}:${mins}:${secs}`;
            var query = `
                SELECT m.id, jumlah_porsi, m.nama, m.harga, tm.status
                FROM menu m JOIN transaksi_menu tm ON (m.id = tm.id_menu)
                    JOIN transaksi t ON (t.id = tm.id_transaksi)
                WHERE username_pembeli = "${row.username_pembeli}" AND tgl_kirim = "${tgl}";
            `;
            connection.query(query, (error, rows, field) => {
                if (error) reject(error);
                else {
                    row.orders = rows;
                    resolve(row);
                }
            });
        }));
    }
    return Promise.all(promises).then((values) => values).catch((error) => console.log(error));
}

exports.orderlist_pembeli = function(req, res) {
    const username = req.params.username;
    // TODO: waktu
    const query = `
        SELECT t.id, w.nama nama_warung, SUM(tm.jumlah_porsi) jumlah, 
            t.tgl_transaksi, t.tgl_kirim, t.total, t.status 
        FROM transaksi t JOIN transaksi_menu tm ON (t.id = tm.id_transaksi)
            JOIN menu m ON (tm.id_menu = m.id)
            JOIN warung w ON (w.id = m.id_warung)
        WHERE username_pembeli = "${username}"
        GROUP BY w.nama, t.id
        ORDER BY t.tgl_transaksi DESC;
    `;        

    connection.query(query, (error, rows, field) => {
        console.log(rows);
        if (error) console.log("Orderlist pembeli", error);
        else response.ok(rows, res);
    });
}

exports.add_order = function(req, res) {
    console.log(req.body.username_pembeli);
    const username_pembeli = req.body.username_pembeli;
    const tgl_transaksi = req.body.tgl_transaksi;
    const tgl_kirim = req.body.tgl_kirim;
    const total = req.body.total;
    const alamat = req.body.alamat;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const orders = req.body.orders;
    const id_warung = req.body.id_warung;
    const status = 0;
    // contoh orders = [
    //     { "id_menu": "1", "qty": 5},
    //     { "id_menu": "5", "qty": 9},
    // ]
    console.log(req.body)
    const query_transaksi = `
        INSERT INTO transaksi VALUES (
            DEFAULT, "${tgl_transaksi}", "${tgl_kirim}", ${total}, "${alamat}", ${latitude}, 
            ${longitude}, ${status}, ${id_warung}, "${username_pembeli}" 
        );
    `;

    connection.query(query_transaksi, (error, rows, field) => {
        if (error) console.log("Add order", error);
        else {
            console.log(rows);
            var query_menu = `INSERT INTO transaksi_menu VALUES`;

            for (var i = 0; i < orders.length; i++) {
                query_menu += ` (${rows.insertId}, ${orders[i].id_menu}, ${orders[i].qty}, 0)`
                if (i < orders.length-1) query_menu += `,`;
            }

            connection.query(query_menu, (error, rows, field) => {
                if (error) console.log("Add transaksi menu", error);
                else response.ok(rows, res);
            });
        }
    });
}

exports.update_order = function(req, res) {
    // Mengubah status order menjadi completed / cancelled
    // Prereq: semua menu dalam order ini harus berstatus 1 kalau mau jadi completed
    const status = req.body.status;
    const id_order = req.body.id_order;

    const query = `
        UPDATE transaksi SET status = ${status} WHERE id = ${id_order};
    `;
    console.log(query);

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Update order", error);
        else response.ok(rows, res);
    });
}

exports.update_ordermenu = function(req, res) {
    // Mengubah status pemasakan menu menjadi completed
    const id_menu = req.body.id;
    const tanggal = req.body.tanggal;

    const query = `
        UPDATE transaksi_menu tm JOIN transaksi t ON (tm.id_transaksi = t.id)
        SET tm.status = 1
        WHERE tm.id_menu = ${id_menu} AND DATE(tgl_kirim) = "${tanggal}";
    `;
    console.log(query);

    connection.query(query, (error, rows, field) => {
        if (error) console.log("Update order", error);
        else response.ok(rows, res);
    });
}

exports.overview_order = function(req, res) {
    const id = req.params.id;
    var promises = [];
    const query_order = `
        SELECT YEAR(tgl_kirim) as year, MONTH(tgl_kirim) as month, COUNT(*) as qty
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (t.id = tm.id_transaksi)
        WHERE t.id_warung = ${id}
        GROUP BY year, month;
    `;
    const query_profit = `
        SELECT YEAR(tgl_kirim) as year, MONTH(tgl_kirim) as month, SUM(total) as profit
        FROM transaksi_menu tm JOIN menu m ON (tm.id_menu = m.id)
            JOIN transaksi t ON (t.id = tm.id_transaksi)
        WHERE t.id_warung = ${id}
        GROUP BY year, month; 
    `;

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_order, (error, rows, field) => {
            if (error) reject(error);
            else resolve(rows, res);
        });
    }));

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_profit, (error, rows, field) => {
            if (error) reject(error);
            else resolve(rows, res);
        });
    }));

    Promise.all(promises)
        .then((values) => response.ok(values, res))
        .catch((error) => console.log(error));
}

exports.ordersummary = function(req, res){
    const id = req.params.id;
    var promises = [];
    // the following routes has status as an attribute
    // 0 = in process / cooking
    // 1 = completed / sent
    // 2 = cancelled

    const query_success = `SELECT * FROM transaksi WHERE status = 1 and id_warung =  ${id};`;
    const query_process = `SELECT * FROM transaksi WHERE status = 0 and id_warung =  ${id};`;
    const query_cancelled = `SELECT * FROM transaksi WHERE status = 2 and id_warung =  ${id};`;

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_success, (error, rows, field) => {
            if (error) reject(error);
            else resolve(rows, res);
        });
    }));

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_cancelled, (error, rows, field) => {
            if (error) reject(error);
            else resolve(rows, res);
        });
    }));

    promises.push(new Promise((resolve, reject) => {
        connection.query(query_process, (error, rows, field) => {
            if (error) reject(error);
            else resolve(rows, res);
        });
    }));

    Promise.all(promises)
        .then((values) => response.ok(values, res))
        .catch((error) => console.log(error));
}