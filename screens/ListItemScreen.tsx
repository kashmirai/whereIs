import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useItems } from "../context/ItemsContext";
import { useNavigation } from "@react-navigation/native";
import { ShowItem } from "./ShowItemScreen";
import { Card, Searchbar } from "react-native-paper";
import { supabase } from "../supabaseClient";
import { SearchComponent } from "../components/Search";

export const ListItem = ({navigation} : any) => {

    const { items, setItems } = useItems();

    useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await supabase
            .from('Item')
            .select();
    
          if (error) {
            console.error('Virhe haettaessa dataa:', error);
          } else {
            setItems(data);
            console.log('Haettu data:', data);
          }
        };
    
        fetchData();
      }, []);
    
    

    return (
        <SafeAreaView className="m-1">
          <Text className="text-xl font-bold mb-4">Lista esineistä</Text>

        <SearchComponent/>

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