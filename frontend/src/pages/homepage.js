import React, {useState, useEffect} from 'react';
import InfoTambahan from '../components/InfoTambahan';
import Searchbar from '../components/Search/Searchbar';
import WarungList from '../components/WarungList/WarungList';
import {getAllWarungList} from "../resource/index";
// import { setDistance } from '../components/WarungList/Distance';
import Filter from '../components/filter/Filter'
import AppHeader from '../components/header'

const HomePage = (props) => {
    
    const [warungList,setWarungList] = useState([]);

    function setDistance(fullData){
        navigator.geolocation.getCurrentPosition(handleSuccess,handleError, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    
        function handleSuccess(position){
            const R = 6371; // Radius of the earth in km
            const lon1 = position.coords.longitude;
            const lat1 = position.coords.latitude;
            for (var i = 0; i < fullData.length; i++){
                const lat2 = fullData[i].latitude;
                const lon2 = fullData[i].longitude;
                const dLat = (lat2-lat1) * (Math.PI / 180);  // Javascript functions in radians
                const dLon = (lon2-lon1) * (Math.PI / 180); 
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1* (Math.PI / 180)) * Math.cos(lat2* (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                const d = Number((R *c ).toFixed(1)); // Distance in km  
                fullData[i]["distance"] = [];
                fullData[i].distance = d;
            }
            setWarungList(fullData);
        }
    
    
        function handleError(error){
            //Handle Errors
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                    break;
            }
        }
    }

    useEffect(() => {
        async function loadWarungList(){
            try{
    
                let response = await getAllWarungList();
                
                if (response.status === 200) {
                    setDistance(response.data.values);
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
            <AppHeader />
            {(window.innerWidth > 768)? <InfoTambahan /> : null}
            <Searchbar/>
            <WarungList data={warungList}/>
        </div>
    );
}

export default HomePage;
