import React, {useState, useEffect} from 'react'
import Searchbar from '../components/Search/Searchbar'
import WarungList from '../components/WarungList/WarungList';
import {getAllWarungList} from "../resource/index"
import Filter from '../components/filter/Filter'

const HomePage = (props) => {
    
  const [warungList,setWarungList] = useState([]);

  useEffect(() => {
      async function loadWarungList(){
          try{
  
              let response = await getAllWarungList();
              
              if (response.status === 200) {
                setWarungList(response.data.values);
              }
  
          }
          catch (e) {
              console.log(e);
          }
      }

      loadWarungList();
  }, []);

    return(
        <div>
            <Searchbar/>
            <WarungList data={warungList}/>
        </div>
    );
}

export default HomePage;