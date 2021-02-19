import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {getWarung} from '../../resource';

const ShowWarung = (props) => {

    const [id, setID] = useState('');
    const [result,setResult] = useState([]);

    let location = useLocation();

    useEffect(() => {
        async function loadWarung(){
            try{
                setID(location.state.id);
    
                let response = await getWarung(id);
                console.log(response.data.values[0]);
                
                if (response.status == 200) {
                    setResult(response.data.values[0]);
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        loadWarung();
    }, [id]);

    return(
        <React.Fragment>
                            <div>
                                {result.id}
                                {result.nama}
                                {result.alamat}
                            </div>
        </React.Fragment>
    );
}

export default ShowWarung;