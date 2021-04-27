import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { getOverviewOrder } from "../../resource";
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper } from '@material-ui/core';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: theme.spacing(5),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: 0,
        paddingRight: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 13,
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
            overflowY: "scroll",
        },
    },
    title:{
        fontFamily: "Roboto Slab",
        fontSize:"large"
    },
    graphContainer: {
        height: '70vh',
        marginLeft: 0,
        marginRight: 0,
    }
})
)

const DashboardPlot = ({id_warung}) =>{

    const [data, setData] = useState([]);
    // const data = [];

    function setArrays(orders){
        const dataCombine = [];
        var orderArray = orders[0];
        const revenueArray = orders[1];
        for (var i = 0; i < orderArray.length; i++){
            var date = ''

            if (orderArray[i].month == 1){ date += "Jan " }
            else if (orderArray[i].month == 2){ date += 'Feb ' }
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
            const dataObj = {name: date, 'Items Ordered': orderArray[i].qty, Profit: revenueArray[i].profit};
            dataCombine.push(dataObj);
        }
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
    }, [id_warung]);

    const classes = useStyles();
    return (
        <Paper className={classes.root} elevation={0}>
            <p className={classes.title}> Summary</p>
            <Container className={classes.graphContainer}>
            <ResponsiveContainer>
                <LineChart
                width={500}
                height={300}
                data={data}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                    yAxisId="left" 
                    dataKey="Items Ordered"
                />
                <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    dataKey="Profit"
                />
                <Tooltip />
                <Legend />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey= "Items Ordered"
                    stroke="#000"
                    activeDot={{ r: 5 }}
                    isAnimationActive={false}
                />
                <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="Profit" 
                    stroke="#FDCB35" 
                    activeDot={{ r: 5 }}
                    isAnimationActive={false}
                />
                </LineChart>
            </ResponsiveContainer>
            </Container>
        </Paper>
        
    );
}

export default DashboardPlot