import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { ShowItem } from './screens/ShowItemScreen';
import { CreateItem } from './screens/CreateItemScreen';
import { ListItem } from './screens/ListItemScreen';
import "./global.css"
import { ItemsProvider } from './context/ItemsContext';
import { PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { LoginScreen } from './screens/LogInScreen';


const Stack = createNativeStackNavigator();


const App = () => { 

  return (
    <PaperProvider>
    <ItemsProvider>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='ShowItem' component={ShowItem as React.ComponentType<any>}/>
          <Stack.Screen name='Add Item' component={CreateItem}/>
          <Stack.Screen name='List Item' component={ListItem}/>
          <Stack.Screen name='Log In' component={LoginScreen}/>
      </Stack.Navigator>
      <FlashMessage position="center"/>
    </NavigationContainer>
    </SafeAreaProvider>

    </ItemsProvider>
    </PaperProvider>  
    
  );
}


export default App;
