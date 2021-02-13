import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const NavMain = (props) => {

    const [namaitem, setNamaitem] = useState('');
    
    let history = useHistory();
    const handleSearch = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/search',
            search : '?query=' + namaitem
        });
    }
    
    return(
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search..." onChange={(e)=>{setNamaitem(e.target.value)}}/>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default NavMain;