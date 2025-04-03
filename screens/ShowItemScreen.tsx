import { Text } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"

import { RouteProp } from '@react-navigation/native';

export const ShowItem = ({ route }: { route: RouteProp<{ params: { item: any } }, 'params'> }) => {

    const { item } = route.params;
    return (
        <SafeAreaView>
          <Text>{item.nimi}, {item.kuvaus}</Text>
        </SafeAreaView>

    )

}