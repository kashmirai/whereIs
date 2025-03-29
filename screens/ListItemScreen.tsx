import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useItems } from "../context/ItemsContext";

export const ListItem = () => {

    const { items } = useItems();
    

    return (
        <SafeAreaView>
          <Text>ListItemScreen</Text>
          <FlatList data={items} renderItem={({item}) => (
            <>
            <Text style={styles.item}>{item.nimi}</Text>
            {item.kuva ? <Image source={{ uri: `file://${item.kuva}` } } style={{width: 100, height: 100}}/> : <Text>ei kuvaa</Text>}

            </>   
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