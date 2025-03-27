import { Button, Text, TextInput, View, PermissionsAndroid } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Geolocation from 'react-native-geolocation-service';

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
        <SafeAreaView className="mx-1">

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
          <Button title="Add Image"/>
          </View>

          <View className="mt-3">
          <Button title="Save" onPress={() => console.log(tiedot)}/>
          </View>
          

        </SafeAreaView>

    )

}