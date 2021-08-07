import React, { useEffect ,useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput
} from 'react-native';

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
        return <View style={styles.namesView}>
                <Text style={styles.names}>{item}</Text>
        </View>
    }

  return (
    <View>
        <TextInput  underlineColorAndroid={'black'} placeholder={"Search user by name"} onChangeText={(value)=>{
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
var styles= StyleSheet.create({
    namesView: {
        padding:10,
        borderColor:'#000',
        borderRadius:10,
        margin:10,
        borderWidth:4
    },
    names:{
        fontSize:20,
        fontWeight:'700'
    },
})
export default UserScreen;
