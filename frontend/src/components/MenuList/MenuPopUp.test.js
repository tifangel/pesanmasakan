import MenuPopUp from './MenuPopUp';
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

const dummyDays = [
    'senin',
    'jumat'
]

test("Render menu pop up", () => {
    const root = document.createElement('div');
    ReactDOM.render(<MenuPopUp 
        data={dummyMenu} 
        days={dummyDays}
        open={false}
        onClose={() => {}}
    />, root);
    const body2 = root.querySelectorAll('p');

    expect(root.querySelector('h2')).toBe(null);
    expect(body2[0]).toBe(undefined);
    expect(body2[4]).toBe(undefined);
})