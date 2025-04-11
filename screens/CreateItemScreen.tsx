import { Text, View, PermissionsAndroid, StyleSheet, Touchable, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Geolocation from 'react-native-geolocation-service';
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { CameraComponent } from "../components/Camera";
import { useItems } from "../context/ItemsContext";
import { HelperText, IconButton, TextInput} from 'react-native-paper';
import { showMessage } from "react-native-flash-message";
import { Button } from 'react-native-paper';
import { useCamera } from "../hooks/useCamera";
import { useLocation } from "../hooks/useLocation";

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
  const {location} = useLocation();
  const { kamera, setKamera, kuvanTiedot, setKuvanTiedot, hasPermission, kaynnistaKamera} = useCamera();

  const tallennaTiedot = () => {

    const lomakeVirheet = tarkastaLomake();
    const onkoVirheita = Object.keys(lomakeVirheet).length > 0;
    if (onkoVirheita) {
      showMessage({
        message: "Tarkista lomake, kaikki kentät ovat pakollisia.",
        type: "danger"
      })
      return;
    } else {
      showMessage({
        message: "Esine tallennettu onnistuneesti.",
        type: "success"
      })
      addItem(tiedot); 
      setTiedot(prev => ({
        ...prev,
        nimi: '',
        kuvaus: '',
        kuva : ''
      }));
      
    }
  }

  useEffect(() => {
  if (kuvanTiedot) {
    setTiedot(prev => ({ ...prev, kuva: kuvanTiedot }));
  }
}, [kuvanTiedot]);

useEffect(() => {
  if (location) {
    setTiedot(prev => ({ ...prev, sijainti: location }));
  }
}, [location]);

const PoistaKuva = () => {
  setKuvanTiedot(""); 
  setTiedot(prev => ({ ...prev, kuva: "" }));}


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


          {tiedot.kuva 
          ?<View className="mt-5" style={{flexDirection: "row", alignItems : "center"}}>
            <Image
            source={{ uri: `file://${kuvanTiedot}` }}
            style={{ width: 100, height: 100, aspectRatio: 1, marginRight : 10 }}
            resizeMode="cover"
            />
            <Text className="text-sm italic" style = {{flex : 1, marginRight : 10}}>{kuvanTiedot}</Text>
            <IconButton icon = "delete" onPress={() => PoistaKuva()}/>
          </View>
          : <></>
          }

          <View className="mt-5">
          <Button mode="contained" onPress={() => kaynnistaKamera()}>Add Image</Button>
          </View>

          <View className="mt-3">
          <Button mode="contained" onPress={() => tallennaTiedot()}>Save Item</Button>
          </View>
          
          {kamera 
          ? <CameraComponent 
              kamera = {kamera} 
              setKamera = {setKamera}
              kuvanTiedot = {kuvanTiedot}
              setKuvanTiedot = {setKuvanTiedot}/> 
          : <></> }
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
  camera: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
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


