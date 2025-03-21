import { Button, StyleSheet, Text } from "react-native"
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export const HomeScreen= () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView>

        <Text className="text-3xl text-center font-bold">Where is</Text>

        <Button 
        title="Add Item" 
        onPress={() => navigation.navigate('Add Item')}
        />
        <Button 
        title="List Item" 
        onPress={() => navigation.navigate('List Item')}
        />

        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    
});