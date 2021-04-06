
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
    const [data, setData] = useState([]);
    

    function setArrays(orders){
        var orderArray = orders[0];
        const revenueArray = orders[1];
        const dateArray = [];
        const orderArr = [];
        const revenueArr = [];
        for (var i = 0; i < orderArray.length; i++){
            var date = ''

            if (orderArray[i].month == 1){ date += "Jan " }
            else if (orderArray[i].month == 2){ date += "Feb " }
            else if (orderArray[i].month == 3){ date += "Mar " }
            else if (orderArray[i].month == 4){ date += "Apr " }
            else if (orderArray[i].month == 5){ date += "May " }
            else if (orderArray[i].month == 6){ date += "Jun " }
            else if (orderArray[i].month == 7){ date += "Jul " }
            else if (orderArray[i].month == 8){ date += "Aug " }
            else if (orderArray[i].month == 9){ date += "Sep " }
            else if (orderArray[i].month == 10){ date += "Oct " }
            else if (orderArray[i].month == 11){ date += "Nov " }
            else if (orderArray[i].month == 12){ date += "Dec " }

            date += orderArray[i].year;
            dateArray.push(date);
            orderArr.push(orderArray[i].qty);
            revenueArr.push(revenueArray[i].profit);
        }

        var trace1 = {
            x: dateArray,
            y: orderArr,
            name: 'items sold',
            type: 'scatter',
            marker:{color:"#000"}
          };
          
          var trace2 = {
            x: dateArray,
            y: revenueArr,
            name: 'profit',
            yaxis: 'y2',
            type: 'scatter',
            marker:{color:"#FDCB35"}
          };
          
          var dataCombine = [trace1, trace2];
          setData(dataCombine);
    }

    useEffect(() => {
        async function loadData(){
            try {
                let response = await getOverviewOrder(id_warung);
            
                if (response.status === 200) {
                    setArrays(response.data.values);

                }
    
            } catch (e) {
                console.log(e);
            }
        }
        loadData();
    }, []);

    const classes = useStyles();

    return (
        <Plot className={classes.root}
            data={data}
            layout={{
                        width: 1000,
                        height: 400,
                        title: 'Overview',
                        yaxis: {
                            title: 'items ordered'
                        },
                        yaxis2: {
                            title: 'profit',
                            titlefont: {color: '#FDCB35'},
                            tickfont: {color: '#FDCB35'},
                            overlaying: 'y',
                            side: 'right'
                        },
                        showlegend: true,
                        legend: {
                            "orientation": "h",
                            "xanchor" : "center",
                            x:0.5
                        }
                    }}

        />
    )
}

export default DashboardPlot