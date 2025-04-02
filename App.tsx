import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { ShowItem } from './screens/ShowItemScreen';
import { CreateItem } from './screens/CreateItemScreen';
import { ListItem } from './screens/ListItemScreen';
import "./global.css"
import { ItemsProvider } from './context/ItemsContext';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();


const App = () => { 

  return (
    <PaperProvider>
    <ItemsProvider>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='ShowItem' component={ShowItem}/>
          <Stack.Screen name='Add Item' component={CreateItem}/>
          <Stack.Screen name='List Item' component={ListItem}/>
      </Stack.Navigator>
    </NavigationContainer>

    </SafeAreaProvider>
    </ItemsProvider>
    </PaperProvider>  
    
  );
}

const styles = StyleSheet.create({

});

export default App;
