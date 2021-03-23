import WarungList from './WarungList';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

const dummyMenu = [{
    'id' : 1,
    'nama' : 'Lalapan Lahap',
    'alamat' : 'Jl pertenakan no 45',
    'kategori' : 'chicken & duck',
    'pic' : '/warung/lalapan-lahap.jpg',
    'longitude' :  -6.917431,
    'latitude' : 107.657066
},{
    'id' : 2,
    'nama' : 'Warung Padang Pak Lontong',
    'alamat' : 'Jl lampunyala no 2',
    'kategori' : 'masakan padang',
    'pic' : '/warung/warung-padang-pak-lontong.jpg',
    'longitude' :  -7.077877,
    'latitude' : 107.735901
}]

test("Render warung list", () => {
    const root = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <WarungList data={dummyMenu}/>
        </BrowserRouter>, root);
    const titles = root.querySelectorAll('h2');

    expect(titles[0].textContent).toBe(dummyMenu[0].nama);
    expect(titles[1].textContent).toBe(dummyMenu[1].nama);
})