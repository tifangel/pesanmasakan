// Calculate distance from 2 positions (longitude and latidue) using Haversine Formula

import { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Distance extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: null,
          longitude: null,
          dist: null,
        };
      };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const R = 6371; // Radius of the earth in km
                const lon1 = position.coords.longitude;
                const lat1 = position.coords.latitude;
                const lat2 = this.props.latitude;
                const lon2 = this.props.longitude;
                
                const dLat = (lat2-lat1) * (Math.PI / 180);  // Javascript functions in radians
                const dLon = (lon2-lon1) * (Math.PI / 180); 
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1* (Math.PI / 180)) * Math.cos(lat2* (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                const d = Number((R *c ).toFixed(1)); // Distance in km  
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    dist: d,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        )
    };

    render(){
        return(
            <Typography variant="body2" color="textSecondary" component="p">
                { this.state.dist + ' km'}
            </Typography>
        )
    }
}
export default Distance;