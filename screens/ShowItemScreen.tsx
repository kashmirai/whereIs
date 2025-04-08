import { Image, StyleSheet, Text, View } from "react-native"
import React, { useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Dialog, IconButton, Portal } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { useItems } from "../context/ItemsContext";

export const ShowItem = ({ route, navigation }: { navigation : any, route: RouteProp<{ params: { item: any } }, 'params'> }) => {

    const { item } = route.params;
    const {dialogi, oneItem, setDialogi, searchOne, deleteItem} = useItems();

        const avaaDialogi = (id: number) => {
          setDialogi(true);
          searchOne(id);
        }

    return (
        <SafeAreaView>
          <View className="flex items-center">
            <Text className="text-xl font-bold text-center">{item.nimi}</Text>
            <IconButton icon = "pen" onPress={() => console.log("muokataan", item.id)}></IconButton>
            <IconButton icon = "delete" onPress={() => avaaDialogi(item.id)}></IconButton>
            <Image source={{ uri: `file://${item.kuva}` } } style={{width: 300, aspectRatio : 9/16}} className="mt-5"/>
            <Text>{item.kuvaus}</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>Back</Button>
          </View>

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
    }
});