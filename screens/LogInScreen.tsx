import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { showMessage } from 'react-native-flash-message';

export const LoginScreen = ({navigation} : any) => {
    
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
    <View className="flex-1 justify-center items-center bg-white px-6">
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

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 w-full py-3 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">Kirjaudu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-blue-600 w-full py-3 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">Home</Text>
      </TouchableOpacity>
    </View>
  );
};

