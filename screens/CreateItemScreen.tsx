import { Button, Text, View, PermissionsAndroid, StyleSheet, Touchable, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Geolocation from 'react-native-geolocation-service';
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { CameraComponent } from "../components/Camera";
import { useItems } from "../context/ItemsContext";
import { HelperText, TextInput} from 'react-native-paper';
import { showMessage } from "react-native-flash-message";


interface Location {
  latitude: number;
  longitude: number;
}
interface Virheet {
  nimi?: string;
  kuvaus?: string;
}

export const CreateItem = () => {

  const [tiedot, setTiedot] = useState({
    nimi: "",
    kuvaus: "",
    sijainti: { latitude: 0, longitude: 0 },
    kuva: ""
  });
  const [virheilmoitukset, setVirheIlmoitukset] = useState<Virheet>({});

  const {addItem} = useItems();

  const tallennaTiedot = () => {

    const lomakeVirheet = tarkastaLomake();
    const onkoVirheita = Object.keys(lomakeVirheet).length > 0;
    if (onkoVirheita) {
      showMessage({
        message: "Tarkista lomake, kaikki kentät ovat pakollisia.",
        type: "danger",
        duration: 3000,})
      return;
    } else {
      showMessage({
        message: "Esine tallennettu onnistuneesti.",
        type: "success",
        duration: 3000,})
      addItem(tiedot); 
    }
  }

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
  const [kuvanTiedot, setKuvanTiedot] = useState<string>("");
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
  


  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
  if (kuvanTiedot) {
    setTiedot(prev => ({ ...prev, kuva: kuvanTiedot }));
  }
}, [kuvanTiedot]);


const tarkastaLomake = () => {

  let virheet : {[key : string] : string} = {};
  Object.entries(tiedot).forEach(([key, value]) => {
    if (tiedot.nimi.trim() === "") {
      virheet.nimi = "Nimi on pakollinen kenttä.";
    }
    if (tiedot.kuvaus.trim() === "") {
      virheet.kuvaus = "Kuvaus on pakollinen kenttä.";
    }
  });

  setVirheIlmoitukset(virheet);
  return virheet;

}



    return (
        
        <SafeAreaView style={{flex : 1}} className="mx-1">

          <Text className="my-2 text-xl font-bold">Add a new item</Text>

          <View>
            <Text>
            {tiedot.sijainti.latitude} {tiedot.sijainti.longitude}
            </Text>
          </View>

          <Text className="mt-4 mb-1">Name</Text>
          <TextInput className={`border p-2 ${virheilmoitukset.nimi ? "border-red-500" : "border-gray-300"}`}  placeholder="Syötä teksti" value={tiedot.nimi} onChangeText={uusinimi => setTiedot(prev => ({...prev, nimi : uusinimi}))}/>
          {virheilmoitukset.nimi && <HelperText type="error">{virheilmoitukset.nimi}</HelperText>}

          <Text className="mt-4 mb-1">Description</Text>
          <TextInput className={`border p-2 ${virheilmoitukset.kuvaus ? "border-red-500" : "border-gray-300"}`}  placeholder="Syötä kuvaus" value={tiedot.kuvaus} onChangeText={uusikuvaus => setTiedot(prev => ({...prev, kuvaus : uusikuvaus}))}/>
          {virheilmoitukset.kuvaus && <HelperText type="error">{virheilmoitukset.kuvaus}</HelperText>}

          <Image 
          source={{ uri: `file://${kuvanTiedot}` }} 
          style={{ width: 200, height: 200 }} 
          />

          <View className="mt-10">
          <Button title="Add Image" onPress={() => kaynnistaKamera()}/>
          </View>

          <View className="mt-3">
          <Button title="Save" onPress={() => tallennaTiedot()}/>
          </View>
          
          {lupa 
          ? <CameraComponent 
              lupa = {lupa} 
              setLupa = {setLupa}
              kuvanTiedot = {kuvanTiedot}
              setKuvanTiedot = {setKuvanTiedot}/> 
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

function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
