import { Button, Text, TextInput, View } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"

export const CreateItem = () => {
    return (
        <SafeAreaView className="mx-1">

          <Text className="my-2 text-xl font-bold">Add a new item</Text>

          <Text className="mt-4 mb-1">Name</Text>
          <TextInput className="border border-black" placeholder="Syötä teksti"></TextInput>

          <Text className="mt-4 mb-1">Description</Text>
          <TextInput className="border border-black" placeholder="Syötä kuvaus"></TextInput>

          <View className="mt-10">
          <Button title="Add Image"/>
          </View>

          <View className="mt-3">
          <Button title="Save"/>
          </View>
          

        </SafeAreaView>

    )

}