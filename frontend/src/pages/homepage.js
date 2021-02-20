import React from 'react'
import Searchbar from '../components/Search/Searchbar'
import WarungList from '../components/warung-list/WarungList'
import Filter from '../components/filter/Filter'

const HomePage = (props) => {
    
    return(
        <div>
            <Searchbar/>
            <WarungList />
        </div>
    );
}

export default HomePage;