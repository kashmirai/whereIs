import { StyleSheet, Text } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button } from 'react-native-paper';

export const HomeScreen= () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView>

        <Text className="text-3xl text-center font-bold">Where is</Text>

        <Button 
        mode="contained"
        className="mt-3"
        onPress={() => navigation.navigate('Add Item')}
        >Add Item</Button>
        <Button 
        mode="contained"
        className="mt-3"
        onPress={() => navigation.navigate('List Item')}
        >List Item</Button>

        </SafeAreaView>

    )

}
