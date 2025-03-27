import { Button, Text, TextInput, View, PermissionsAndroid } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Geolocation from 'react-native-geolocation-service';

interface Location {
  latitude: number;
  longitude: number;
}

export const CreateItem = () => {

  const Permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool App Location Permission',
          message:
            'Cool App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
      } else {
        console.log('Camera permission denied');
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
        setTiedot(prev => ({...prev, sijainti : latitude}))
      }
    )
  }
  

  const [tiedot, setTiedot] = React.useState({
    nimi : "",
    kuvaus : "",
    sijainti : 0
  });

  useEffect(() => {
    
  }, []);


    return (
        <SafeAreaView className="mx-1">

          <Text className="my-2 text-xl font-bold">Add a new item</Text>

          <Text className="mt-4 mb-1">Name</Text>
          <TextInput className="border border-black" placeholder="Syötä teksti" value={tiedot.nimi} onChangeText={uusinimi => setTiedot(prev => ({...prev, nimi : uusinimi}))}></TextInput>

          <Text className="mt-4 mb-1">Description</Text>
          <TextInput className="border border-black" placeholder="Syötä kuvaus" value={tiedot.kuvaus} onChangeText={uusikuvaus => setTiedot(prev => ({...prev, kuvaus : uusikuvaus}))}></TextInput>

          <View className="mt-10">
          <Button title="Add Image"/>
          </View>

          <View className="mt-10">
          <Button title="Location" onPress={Permission}/>
          </View>

          <View className="mt-3">
          <Button title="Save" onPress={() => console.log(tiedot)}/>
          </View>
          

        </SafeAreaView>

    )

}