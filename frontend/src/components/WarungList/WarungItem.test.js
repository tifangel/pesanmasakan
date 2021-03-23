import WarungItem from './WarungItem';
import React from 'react';
import ReactDOM from 'react-dom';

const dummyMenu = {
    'id' : 1,
    'nama' : 'Lalapan Lahap',
    'alamat' : 'Jl pertenakan no 45',
    'kategori' : 'chicken & duck',
    'pic' : '/warung/lalapan-lahap.jpg',
    'longitude' :  -6.917431,
    'latitude' : 107.657066
}

test("Render warung item", () => {
    const root = document.createElement('div');
    ReactDOM.render(<WarungItem data={dummyMenu}/>, root);
    const body2 = root.querySelectorAll('p');

    expect(root.querySelector('h2').textContent).toBe(dummyMenu.nama);
    expect(body2[0].textContent).toBe(dummyMenu.kategori);
    expect(body2[3].textContent).toBe(dummyMenu.alamat);
})