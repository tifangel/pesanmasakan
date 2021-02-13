import React from 'react'

const WarungSearch = ({
        key,
        data
    }) => {
    
    return(
        <div key={data.id}>
            <h3>{data.nama}</h3>
            <h4>{data.alamat}</h4>
            <h5>{data.kategori}</h5>
        </div>
    );
}

export default WarungSearch;