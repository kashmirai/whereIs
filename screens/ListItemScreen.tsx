import { Text } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useItems } from "../context/ItemsContext";

export const ListItem = () => {

    const { items } = useItems();
    return (
        <SafeAreaView>
          <Text>ListItemScreen</Text>
          {items.map((item, index) => (
            <Text key={index} className="text-xl text-center font-bold">{item.nimi}</Text>
          ))}
        </SafeAreaView>

    )

}