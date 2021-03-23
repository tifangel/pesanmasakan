import MenuItem from './MenuItem';
import React from 'react';
import ReactDOM from 'react-dom';

const dummyMenu = {
    'id' : 1,
    'id_warung' : 1,
    'nama' : 'ayam goreng',
    'harga' : 15000,
    'desc_menu' : 'lalapan ayam goreng dengan nasi, sayur, dan sambal',
    'pic' : '/menu/1-ayam-goreng.jpg'
}

test("Render menu item", () => {
    const root = document.createElement('div');
    ReactDOM.render(<MenuItem data={dummyMenu} onMenuClick={() => {}}/>, root);
    const body2 = root.querySelectorAll('p');

    expect(root.querySelector('h2').textContent).toBe(dummyMenu.nama);
    expect(body2[0].textContent).toBe(dummyMenu.desc_menu);
    expect(body2[1].textContent).toBe("Rp " + dummyMenu.harga);
})