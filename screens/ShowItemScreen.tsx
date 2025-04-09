import { Image, StyleSheet, Text, View } from "react-native"
import React, { useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Dialog, IconButton, Portal, TextInput } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useItems } from "../context/ItemsContext";

export const ShowItem = ({ route, navigation }: { navigation : any, route: RouteProp<{ params: { item: any } }, 'params'> }) => {

    const { item } = route.params;
    const {dialogi, oneItem, setDialogi, searchOne, deleteItem, muokkausTila, setMuokkausTila, editItem} = useItems();

        const avaaDialogi = (id: number) => {
          setDialogi(true);
          searchOne(id);
        }

        useFocusEffect(
            React.useCallback(() => {
                setMuokkausTila(false);
            }, [setMuokkausTila])
        );


    return (
        <SafeAreaView>

          {muokkausTila 
            ? <View style={styles.editContainer}>
                <TextInput style={styles.textInput} defaultValue={item.nimi} />
                <TextInput style={styles.textInput} defaultValue={item.kuvaus} />
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: `file://${item.kuva}` }} style={styles.image} />
                  <IconButton
                    icon="pen"
                    size={24}
                    style={styles.editIcon}
                    onPress={() => console.log("Edit image")}
                  />
                </View>
                <View style={styles.buttonRow}>
                  <Button mode="contained" onPress={() => setMuokkausTila(!muokkausTila)}>Peru</Button>
                  <Button mode="contained" onPress={() => console.log("Muokataan")}>Tallenna muutokset</Button>
                </View>
              </View>
            : <View className="flex items-center">
              <View className="flex flex-row justify-between items-center mt-5">
                <Text className="text-xl font-bold text-center">{item.nimi}</Text>
                  <View className="flex flex-row">
                    <IconButton icon = "pen" onPress={() => console.log("muokataan", item.id, setMuokkausTila(!muokkausTila))}></IconButton>
                    <IconButton icon = "delete" onPress={() => avaaDialogi(item.id)}></IconButton>
                  </View>

              </View>

              <Text>{item.kuvaus}</Text>
                <Image source={{ uri: `file://${item.kuva}` } } style={{width: 300, aspectRatio : 9/16}} className="mt-5"/>
                <Button mode="contained" onPress={() => navigation.goBack()}>Back</Button>
              </View>
          }



                  <Portal>
                    <Dialog visible={dialogi} onDismiss={() => setDialogi(false)}>
                      <Dialog.Title>Vahvista poisto</Dialog.Title>
                      <Dialog.Content>
                        <Text>Haluatko varmasti poistaa esineen {oneItem?.nimi}?</Text>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={() => { deleteItem(oneItem!.id); navigation.goBack(); }}>Poista</Button>
                        <Button onPress={() => setDialogi(false)}>Peruuta</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>

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
});