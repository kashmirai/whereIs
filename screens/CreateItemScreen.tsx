import { Button, Text, TextInput, View, PermissionsAndroid, StyleSheet, Touchable, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Geolocation from 'react-native-geolocation-service';
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { CameraComponent } from "../components/Camera";

interface Location {
  latitude: number;
  longitude: number;
}

export const CreateItem = () => {

  
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

  const [location, setLocation] = useState<Location | null>(null);  
  const [lupa, setLupa] = useState<boolean>(false);
  const { hasPermission, requestPermission } = useCameraPermission();

  const kaynnistaKamera = () => {
    requestPermission();
    setLupa(true);
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log(latitude, longitude);
        setTiedot(prev => ({...prev, sijainti : {latitude, longitude}}));
      }
    )
  }
  

  const [tiedot, setTiedot] = React.useState({
    nimi : "",
    kuvaus : "",
    sijainti : {latitude : 0, longitude : 0}
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);



    return (
        
        <SafeAreaView style={{flex : 1}} className="mx-1">

          

          <Text className="my-2 text-xl font-bold">Add a new item</Text>

          <View>
            <Text>
            {tiedot.sijainti.latitude} {tiedot.sijainti.longitude}
            </Text>
          </View>

          <Text className="mt-4 mb-1">Name</Text>
          <TextInput className="border border-black" placeholder="Syötä teksti" value={tiedot.nimi} onChangeText={uusinimi => setTiedot(prev => ({...prev, nimi : uusinimi}))}></TextInput>

          <Text className="mt-4 mb-1">Description</Text>
          <TextInput className="border border-black" placeholder="Syötä kuvaus" value={tiedot.kuvaus} onChangeText={uusikuvaus => setTiedot(prev => ({...prev, kuvaus : uusikuvaus}))}></TextInput>

          <View className="mt-10">
          <Button title="Add Image" onPress={() => kaynnistaKamera()}/>
          </View>

          <View className="mt-3">
          <Button title="Save" onPress={() => console.log(tiedot)}/>
          </View>
          
          {lupa 
          ? <CameraComponent 
              lupa = {lupa} 
              setLupa = {setLupa}/> 
          : <Text>Ei lupaa</Text> }
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
  camera: {
    position: 'absolute', // Asetetaan kamera absoluuttisesti
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Peittää koko ruudun
    width: '100%',
    height: '100%', // Tällä varmistetaan, että kamera täyttää koko näytön
  },
  button : {
    flex : 1,
    backgroundColor: 'white',
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30, 
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -30 
  }
});