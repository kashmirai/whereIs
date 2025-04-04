import { Image, StyleSheet, Text, View } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';

export const ShowItem = ({ route, navigation }: { navigation : any, route: RouteProp<{ params: { item: any } }, 'params'> }) => {

    const { item } = route.params;

    return (
        <SafeAreaView>
          <View className="flex items-center">
            <Text className="text-xl font-bold text-center">{item.nimi}</Text>
            <Image source={{ uri: `file://${item.kuva}` } } style={{width: 300, aspectRatio : 9/16}} className="mt-5"/>
            <Text>{item.kuvaus}</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>Back</Button>
          </View>
        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    button : {
      position : "absolute",
      bottom : 10,
    }
});