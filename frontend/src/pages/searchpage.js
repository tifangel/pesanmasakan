import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import {getWarungList} from '../resource';
import WarungSearch from '../components/Search/WarungSearch';

const SearchPage = (props) => {

    const [datasearch, setDataSearch] = useState('');
    const [result,setResult] = useState([]);

    const [currentPage,setCurrentPage] = useState(1);
    const postPerPage = 3;

    useEffect(() => {
        async function loadWarungList(){
            try{
                console.log(props.location.pathname);
                console.log(props.location.search);
                
                let params = queryString.parse(props.location.search);
                console.log(params.query);
                
                setDataSearch(params.query);
                
                let response = await getWarungList(datasearch);

                console.log(response.status);
                console.log(response.data);
                
                if (response.status == 200) {
                    setResult(response.data.values);
                    console.log(result);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        loadWarungList();
    }, [props.location,result])

    let lastIndex = currentPage * postPerPage;
    let firstIndex = lastIndex - postPerPage;

    // if (result.length){

    // }

    return(
        <div>
            {result.map((item,index) => {
                return(
                    <WarungSearch
                        key={index}
                        data={item}
                    />
                );
            })}
        </div>
    );
}

export default SearchPage;