import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, Dialog, IconButton, Portal, TextInput } from 'react-native-paper';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useItems } from "../context/ItemsContext";
import { useCamera } from "../hooks/useCamera";
import { CameraComponent } from "../components/Camera";

export const ShowItem = ({ route, navigation }: { navigation : any, route: RouteProp<{ params: { item: any } }, 'params'> }) => {
  const insets = useSafeAreaInsets()
  const { item } = route.params;
  const { dialogi, oneItem, setDialogi, dialogTyyppi, setDialogTyyppi, searchOne, deleteItem, muokkausTila, setMuokkausTila, editItem } = useItems();
  const { kamera, setKamera, kuvanTiedot, setKuvanTiedot, kaynnistaKamera } = useCamera();

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
    }
  }, [kuvanTiedot]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }} className="bg-white">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}>
        
        {muokkausTila ? (
          <View className="flex items-center space-y-4">
            <TextInput
              label="Nimi"
              value={tiedot.nimi}
              onChangeText={(text) => setTiedot(prev => ({ ...prev, nimi: text }))}
              mode="outlined"
              style={styles.textInput}
            />
            <TextInput
              label="Kuvaus"
              value={tiedot.kuvaus}
              onChangeText={(text) => setTiedot(prev => ({ ...prev, kuvaus: text }))}
              mode="outlined"
              multiline
              style={styles.textInput}
            />
            <View style={styles.imageWrapper}>
              <Image source={{ uri: `file://${tiedot.kuva}` }} style={styles.image} />
              <IconButton
                icon="camera"
                size={24}
                style={styles.editIcon}
                onPress={kaynnistaKamera}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button mode="outlined" onPress={() => setMuokkausTila(false)}>Peru</Button>
              <Button mode="contained" onPress={() => avaaMuokkausDialogi(item.id)}>Tallenna</Button>
            </View>
          </View>
        ) : (
          <View className="space-y-4">
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-2xl font-bold">{item.nimi}</Text>
              <View className="flex-row space-x-2">
                <IconButton icon="pen" onPress={() => setMuokkausTila(true)} />
                <IconButton icon="delete" onPress={() => avaaPoistoDialogi(item.id)} />
              </View>
            </View>
            <Text className="text-base text-gray-700">{item.kuvaus}</Text>
            <Text className="text-sm text-gray-500">
              {item.sijainti.latitude}, {item.sijainti.longitude}
            </Text>
            <Image source={{ uri: `file://${item.kuva}` }} className="my-5" style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 12 }} />
            <Button mode="outlined" onPress={() => navigation.goBack()}>Takaisin</Button>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={dialogi} onDismiss={() => setDialogi(false)}>
          <Dialog.Title>
            {dialogTyyppi === 'delete' ? 'Vahvista Poisto' : 'Muokkaa Esinettä'}
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              {dialogTyyppi === 'delete'
                ? `Haluatko varmasti poistaa esineen ${oneItem?.nimi}?`
                : `Haluatko varmasti tallentaa muutokset esineeseen ${oneItem?.nimi}?`}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
          <Button mode="outlined" onPress={() => setDialogi(false)}>Peruuta</Button>
            {dialogTyyppi === 'delete' ? (
              <Button mode="contained" onPress={() => {
                if (oneItem?.id !== undefined) {
                  deleteItem(oneItem.id);
                  navigation.goBack();
                }
              }}>Poista</Button>
            ) : (
              <Button mode="contained" onPress={() => {
                if (oneItem?.id !== undefined) {
                  editItem(oneItem.id, tiedot);
                  navigation.goBack();
                }
              }}>Tallenna</Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {kamera && (
        <CameraComponent
          kamera={kamera}
          setKamera={setKamera}
          kuvanTiedot={kuvanTiedot}
          setKuvanTiedot={setKuvanTiedot}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 4,
    marginBottom: 8,
    marginTop : 8
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  editIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  }
});
