import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Test = ({onClick}) => {

    return(
        <React.Fragment>
            <div>
                Hello World
                <IconButton
                            onClick={onClick}
                        >
                            <EditIcon/>
                        </IconButton>
            </div>
        </React.Fragment>
    );
}

export default Test