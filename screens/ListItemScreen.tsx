import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { useItems } from "../context/ItemsContext";
import { Card } from "react-native-paper";
import { supabase } from "../supabaseClient";
import { SearchComponent } from "../components/Search";
import { showMessage } from "react-native-flash-message";

export const ListItem = ({navigation} : any) => {

    const insets = useSafeAreaInsets()
    const { items, setItems } = useItems();
    const [user, setUser] = useState<any>(null);
    const [virhe, setVirhe] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
              const { data, error } = await supabase
              .from('Item')
              .select();
            if (error) {
              console.error('Virhe haettaessa dataa:', error);
            } else {
              setItems(data);
            }
          } catch (error) {
              console.error('Virhe haettaessa dataa:', error);
          }
        };
        fetchData();
      }, []);

    useEffect(() => {
      const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };
  
      fetchUser();
    }, []);
  

    const navigoi = (item: any) => {
        if (user) {
          navigation.navigate("ShowItem", { item });
        }
        else {
          setVirhe("Sisäänkirjautuminen vaaditaan");
          showMessage({
            message: "Sisäänkirjautuminen vaaditaan",
            type: "danger",
          });
        }

    }
    
    return (
        <View style={{ flex : 1, paddingTop : insets.top, paddingBottom : insets.bottom }} className="bg-white px-6">
        
          <Text className="text-xl font-bold mb-4">Lista esineistä</Text>

        <SearchComponent/>

          <FlatList data={items} renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigoi(item)}>
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



        </View>

        

    )

}

const styles = StyleSheet.create({
    item : {
        padding : 10,
        borderBottomWidth : 1,
        borderBottomColor : "#ccc",
    }
});