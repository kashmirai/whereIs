import { Button, Text, TextInput, View } from "react-native"
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import RNLocation from 'react-native-location'

export const CreateItem = () => {

  const [tiedot, setTiedot] = React.useState({
    nimi : "",
    kuvaus : ""
  });


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

          <View className="mt-3">
          <Button title="Save" onPress={() => console.log(tiedot)}/>
          </View>
          

        </SafeAreaView>

    )

}