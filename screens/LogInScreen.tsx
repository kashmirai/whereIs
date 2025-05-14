import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

export const LoginScreen = ({navigation} : any) => {
    
  const insets = useSafeAreaInsets()
  const [email, setEmail] = useState('test@test.fi');
  const [password, setPassword] = useState('test123');

  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {
      console.error("Kirjautumisvirhe:", error.message);
      showMessage({
        message: "Kirjautuminen epäonnistui",
        description: error.message,
        type: "danger",
      });
    } else {
      console.log("Kirjautuminen onnistui!");
      showMessage({
        message: "Kirjautuminen onnistui",
        description: `Tervetuloa, ${email}`,
        type: "success",
      });
      navigation.navigate('Home'); 
    }
  };

  return (
    <View style={{ flex : 1, paddingTop : insets.top, paddingBottom : insets.bottom }} className="bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Kirjaudu sisään</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Sähköposti"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="Salasana"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        onPress={handleLogin}
        mode='contained'
        className='mb-3'
      >
        <Text className="text-center text-lg font-semibold">Kirjaudu</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate('Home')}
        mode='outlined'
      >
        <Text className= "text-center text-lg font-semibold">Etusivulle</Text>
      </Button>
    </View>
  );
};

