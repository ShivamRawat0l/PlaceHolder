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
function PostScreen({route,navigation}){

    const [post , setPost ]= useState([]); 
    const [comments , setComments ]= useState([]); 
    const {postId} = route.params;
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts?id='+postId)
            .then(blob=>blob.json())
            .then(data=>{
              setPost(data[0]); 
            })
          fetch('https://jsonplaceholder.typicode.com/comments?postId='+postId)
            .then(blob=>blob.json())
            .then(data=>{
              setComments(data); 
            })
    },[]);

   
  const RenderComments=  ({item})=>{
    return <View style={{padding:10,borderColor:'#000',borderRadius:2,margin:10,borderWidth:2}}>
        <Text style={{fontSize:15}}>{item.name}</Text>
        <Text style={{fontSize:15}}>{item.body}</Text>
        <Text style={{fontSize:15}}>{item.email}</Text>
    </View>
}
  return (
    <View>
      <ScrollView>
      <View style={{padding:10,borderColor:'#000',borderRadius:2,margin:10,borderWidth:2}}>
          <Text style={{fontSize:20}}>{post.title}</Text>
          <Text style={{fontSize:20}}>{post.body}</Text>
      </View>
      <Text style={{fontSize:15,paddingLeft:20}}>Comments</Text>
        {comments.map((data,index)=>{
          return <RenderComments key={index} item={data}/>
        })}
        
        </ScrollView>
    </View>
  );
};

export default PostScreen;
