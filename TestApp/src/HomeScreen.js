import React, { useEffect,useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function HomeScreen(props){
    const [posts , setPosts ]= useState([]); 
    const [users , setUsers ]= useState({}); 
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(blob=>blob.json())
            .then(data=>{
                setPosts(data); 
            })
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(blob=>blob.json())
            .then(data=>{
                var userDictionary = {}; 
                 data.forEach(user=>{
                    userDictionary[user.id]=user.name;   
                })
                setUsers(userDictionary);
            })
    },[]);

    const renderItem=  ({item})=>{
        return <View style={{padding:10,borderColor:'#000',borderRadius:2,margin:10,borderWidth:2}}>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate("Post",{postId: item.id});
            }}>
            <Text style={{fontSize:20}}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate("Users",{userId: item.userId});
            }}>
            <Text style={{fontSize:15,justifyContent:'flex-end',alignSelf:'flex-end',paddingTop:30}}>{users[item.userId]}</Text>
            </TouchableOpacity>
        </View>
    }

  return (
    <View>
        <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        />
    </View>
  );
};

export default HomeScreen;
