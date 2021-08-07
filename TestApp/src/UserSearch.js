import React, { useEffect ,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';
const Stack = createNativeStackNavigator();
function UserScreen(props){

    const [user , setUser ]= useState([]); 
    const [search , setSearch ]= useState([]); 
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(blob=>blob.json())
            .then(data=>{
                var userArray  = [] ; 
                userArray= data.map(user=>{
                    return user.name; 
                })
                setUser(userArray);
                setSearch(userArray);
            })
    },[]);

    const renderItem=  ({item})=>{
        return <View style={{padding:10,borderColor:'#000',borderRadius:2,margin:10,borderWidth:2}}>
                <Text style={{fontSize:20}}>{item}</Text>
        </View>
    }

  return (
    <View>
        <TextInput placeholder={"Search user by name"} onChangeText={(value)=>{
            console.log(value)
            var filteredUser= user.filter(data=>{
                var lower= data.toLowerCase();
               return (lower.search(value.toLowerCase())!=-1)
            })
            setSearch(filteredUser);
        }} style={{fontSize:20,padding:10, margin:15}}></TextInput>
        <FlatList
        data={search}
        renderItem={renderItem}
        keyExtractor={(item)=>(item)}
        />
    </View>
  );
};

export default UserScreen;
