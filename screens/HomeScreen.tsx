import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button } from 'react-native-paper';
import { supabase } from "../supabaseClient"
import { showMessage } from "react-native-flash-message"

export const HomeScreen= () => {

    const insets = useSafeAreaInsets()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          setUser(user);
        };
    
        fetchUser();
      }, []);

    return (
        <View style={{ flex : 1, paddingTop : insets.top, paddingBottom : insets.bottom }} className="bg-white px-6">

        <Text className="text-3xl text-center font-bold">Where is</Text>

        {user && (
            <Text className="text-center text-lg mt-3">Tervetuloa, {user.email}</Text>
        )}

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

        <Button 
        mode="outlined"
        className="mt-3"
        onPress={() => navigation.navigate('Log In')}
        >Kirjaudu</Button>

        <Button 
        mode="outlined"
        className="mt-3"
        onPress={async () => {
            const { error } = await supabase.auth.signOut();

            if (error) {
            console.error("Virhe uloskirjautumisessa:", error.message);
            showMessage({
                message: "Uloskirjautuminen epäonnistui",
                description: error.message,
                type: "danger",
            });
            } else {
            showMessage({
                message: "Kirjauduttu ulos",
                type: "success",
            });
            navigation.replace('Log In'); // tai navigate, riippuen appisi rakenteesta
            }
        }}
        >
        Kirjaudu ulos
        </Button>

        </View>

    )

}
