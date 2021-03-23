import MenuList from './MenuList';
import React from 'react';
import ReactDOM from 'react-dom';

const dummyMenu = [{
    'id' : 1,
    'id_warung' : 1,
    'nama' : 'ayam goreng 1',
    'harga' : 15000,
    'desc_menu' : 'lalapan ayam goreng dengan nasi, sayur, dan sambal',
    'pic' : '/menu/1-ayam-goreng.jpg'
},{
    'id' : 2,
    'id_warung' : 1,
    'nama' : 'ayam goreng 2',
    'harga' : 15000,
    'desc_menu' : 'lalapan ayam goreng dengan nasi, sayur, dan sambal',
    'pic' : '/menu/1-ayam-goreng.jpg'
},{
    'id' : 3,
    'id_warung' : 1,
    'nama' : 'ayam goreng 3',
    'harga' : 15000,
    'desc_menu' : 'lalapan ayam goreng dengan nasi, sayur, dan sambal',
    'pic' : '/menu/1-ayam-goreng.jpg'
}]

test("Render menu list", () => {
    const root = document.createElement('div');
    ReactDOM.render(<MenuList data={dummyMenu} onMenuClick={() => {}}/>, root);
    const titles = root.querySelectorAll('h2');

    expect(titles[0].textContent).toBe(dummyMenu[0].nama);
    expect(titles[1].textContent).toBe(dummyMenu[1].nama);
    expect(titles[2].textContent).toBe(dummyMenu[2].nama);
})