/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen'
import UserScreen from './src/UserScreen'
import PostScreen from './src/PostScreen'
import UserSearch from './src/UserSearch'
const Stack = createNativeStackNavigator();
function App(){
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation})=>({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Search") }
              title="Search"
              color="#000"
            />
          ),
        })}/>
        <Stack.Screen name="Users" component={UserScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Search" component={UserSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
