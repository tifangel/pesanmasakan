
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { makeStyles} from '@material-ui/core';
import { getOverviewOrder } from "../../resource";

const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop: theme.spacing(5)
    },
})
)

const DashboardPlot = ({id_warung}) =>{
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function loadData(id){
            try {

                let response = await getOverviewOrder(id_warung);
            
                if (response.status === 200) {
                    setOrders(response.data.values);
                }
    
            } catch (e) {
                console.log(e);
            }
        } 
        loadData();
        // console.log(orders);   
    }, [orders]);

    
    const orderArray = orders.map(a => a.qty);
    const dateArray = orders.map(a => a.month);

    var trace1 = {
        x: {dateArray},
        y: [2, 1],
        name: 'yaxis data',
        type: 'scatter'
    };
    
    var trace2 = {
        x: {dateArray},
        y: [27000, 10000],
        name: 'yaxis2 data',
        yaxis: 'y2',
        type: 'scatter'
    };
    
    var data = [trace1, trace2];

    const classes = useStyles();
    return (
        <Plot className={classes.root}
            data={data}
            layout={{
                        autosize: false,
                        height:450,
                        width:1050,
                        title: 'Overview',
                        yaxis: {title: 'items ordered'},
                        yaxis2: {
                            title: 'profit',
                            titlefont: {color: 'rgb(148, 103, 189)'},
                            tickfont: {color: 'rgb(148, 103, 189)'},
                            overlaying: 'y',
                            side: 'right'
                            }
                    }}
                
        />
        
)
}

export default DashboardPlot