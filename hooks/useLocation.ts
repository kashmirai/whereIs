import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

interface Location {
    latitude: number;
    longitude: number;
  }

export const useLocation = () => {

    const [location, setLocation] = useState<Location | null>(null);  

    const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
        } else {
        console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
    };
    
    const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        }
    )
    }
    
    useEffect(() => {
    requestLocationPermission();
    }, []);

  return {
    location
  };
};
