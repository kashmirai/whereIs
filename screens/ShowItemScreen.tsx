import { Image, StyleSheet, Text, View } from "react-native"
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Dialog, IconButton, Portal, TextInput } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useItems } from "../context/ItemsContext";
import { useCamera } from "../hooks/useCamera";
import { CameraComponent } from "../components/Camera";

export const ShowItem = ({ route, navigation }: { navigation : any, route: RouteProp<{ params: { item: any } }, 'params'> }) => {

    const { item } = route.params;
    const {dialogi, oneItem, setDialogi, dialogTyyppi, setDialogTyyppi, searchOne, deleteItem, muokkausTila, setMuokkausTila, editItem} = useItems();
    const { kamera, setKamera, kuvanTiedot, setKuvanTiedot, hasPermission, kaynnistaKamera} = useCamera();

        const avaaPoistoDialogi = (id: number) => {
          setDialogTyyppi('delete')
          setDialogi(true);
          searchOne(id);
        }

        const avaaMuokkausDialogi = (id: number) => {
          setDialogTyyppi('edit')
          setDialogi(true);
          searchOne(id);
        }

        useFocusEffect(
            React.useCallback(() => {
                setMuokkausTila(false);
            }, [setMuokkausTila])
        );

       const [tiedot, setTiedot] = useState({
         nimi: item.nimi,
         kuvaus: item.kuvaus,
         sijainti: { latitude: item.sijainti.latitude, longitude: item.sijainti.longitude },
         kuva: item.kuva
       });   

         useEffect(() => {
         if (kuvanTiedot) {
           setTiedot(prev => ({ ...prev, kuva: kuvanTiedot }));
           console.log(tiedot);
         }
       }, [kuvanTiedot]);


    return (
        <SafeAreaView>

          {muokkausTila 
            ? <View style={styles.editContainer}>
                <TextInput style={styles.textInput} defaultValue={tiedot.nimi} onChangeText={(text) => setTiedot(prev => ({ ...prev, nimi: text }))}/>
                <TextInput style={styles.textInput} defaultValue={tiedot.kuvaus} onChangeText={(text) => setTiedot(prev => ({ ...prev, kuvaus: text }))} />
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: `file://${tiedot.kuva}` }} style={styles.image} />
                  <IconButton
                    icon="pen"
                    size={24}
                    style={styles.editIcon}
                    onPress={() => kaynnistaKamera()}
                  />
                </View>
                <View style={styles.buttonRow}>
                  <Button mode="contained" onPress={() => setMuokkausTila(!muokkausTila)}>Peru</Button>
                  <Button mode="contained" onPress={() => {
                  avaaMuokkausDialogi(item.id);
                  }}>Tallenna muutokset</Button>
                </View>
              </View>

            

            : <View className="flex items-center bg-white">
              <View className="flex flex-row justify-between items-center mt-5">
                <Text className="text-xl font-bold text-center">{item.nimi}</Text>
                  <View className="flex flex-row">
                    <IconButton icon = "pen" onPress={() => setMuokkausTila(!muokkausTila)}></IconButton>
                    <IconButton icon = "delete" onPress={() => avaaPoistoDialogi(item.id)}></IconButton>
                  </View>
              </View>
              <Text className="text-l">{tiedot.kuvaus}</Text>
              <Text className="text-sm" >{tiedot.sijainti.latitude}, {tiedot.sijainti.longitude}</Text>
                <Image source={{ uri: `file://${item.kuva}` } } style={{width: 300, aspectRatio : 9/16}} className="my-5"/>
                <Button mode="contained" onPress={() => navigation.goBack()}>Back</Button>
              </View>
          }


                  <Portal>
                    <Dialog visible={dialogi} onDismiss={() => setDialogi(false)}>
                      <Dialog.Title>{dialogTyyppi === 'delete' ? 'Vahvista Poisto' : 'Muokkaa item' }</Dialog.Title>
                      <Dialog.Content>
                        <Text>{dialogTyyppi === 'delete' ? `Haluatko varmasti poistaa esineen ${oneItem?.nimi}?` : ` Haluatko varmasti muokata itemiä ${oneItem?.nimi}?` }</Text>
                      </Dialog.Content>
                      <Dialog.Actions> 
                        {dialogTyyppi === 'delete' 
                        ? <Button onPress={() => { 
                          if (oneItem?.id !== undefined) {
                              deleteItem(oneItem.id); 
                              navigation.goBack(); 
                          } 
                          }}>Poista</Button>
                        : <Button onPress={() => { 
                          if (oneItem?.id !== undefined) {
                              editItem(oneItem.id, tiedot); 
                              navigation.goBack(); 
                          } 
                      }}>Muokkaa</Button>
                         }

                        <Button onPress={() => setDialogi(false)}>Peruuta</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>

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
    button : {
      position : "absolute",
      bottom : 10,
    },
    imageContainer : {
      width : "100%",
      height : 300,
      justifyContent : "center",
      alignItems : "center",
    },
    editContainer: {
        flex: 1,
        alignItems: "center",
        padding: 16,
    },
    textInput: {
        width: "80%",
        height: 50,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    imageWrapper: {
        position: "relative",
        width: 300,
        aspectRatio: 9 / 16,
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    editIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 16,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 16,
    },
    fullscreen: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
    },
});