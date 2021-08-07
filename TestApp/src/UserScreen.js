import React, { useEffect ,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function UserScreen({route, navigation}){

    const {userId} = route.params;
    const [user , setUser ]= useState([]); 
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users?id='+userId)
            .then(blob=>blob.json())
            .then(data=>{
                setUser(data); 
            })
    },[]);

    const renderItem=  ({item})=>{
        return <View style={{padding:10,borderColor:'#000',borderRadius:2,margin:10,borderWidth:2}}>
            <Text style={{fontSize:20}}>{item.name}</Text>
            <Text style={{fontSize:20}}>{item.username}</Text>
            <Text style={{fontSize:20}}>{item.email}</Text>
            <Text style={{fontSize:20}}>{item.website}</Text>
            <View>
            <Text style={{fontSize:20}}>{item.company.name}</Text>
            <Text style={{fontSize:20}}>{item.company.catchPhrase}</Text>
            <Text style={{fontSize:20}}>{item.company.bs}</Text>
            </View>
            <Text style={{fontSize:20}}>{item.name}</Text>
        </View>
    }

  return (
    <View>
        <FlatList
        data={user}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        />
    </View>
  );
};

export default UserScreen;
