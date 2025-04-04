import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useItems } from "../context/ItemsContext";
import { useNavigation } from "@react-navigation/native";
import { ShowItem } from "./ShowItemScreen";
import { Card, Searchbar } from "react-native-paper";

export const ListItem = ({navigation} : any) => {

    const { items } = useItems();
    

    return (
        <SafeAreaView className="m-1">
          <Text className="text-xl font-bold mb-4">Lista esineistä</Text>

          <Searchbar
          placeholder="Search"
          onChangeText={(query) => console.log(query)}
          value=""
          />

          <FlatList data={items} renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate("ShowItem", { item })}>
            <Card className="mt-2">
                <Card.Content className="flex flex-row items-center justify-between">
                  <Image source={{ uri: `file://${item.kuva}` } } style={{width: 50, aspectRatio : 1}}/>
                    <View className="flex-1 ml-5">
                        <Text className="text-lg">{item.nimi}</Text>
                    </View>
                </Card.Content>
            </Card>
            </TouchableOpacity>   
          )}/>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    item : {
        padding : 10,
        borderBottomWidth : 1,
        borderBottomColor : "#ccc",
    }
});