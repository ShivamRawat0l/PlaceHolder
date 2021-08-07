import React, { useEffect ,useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

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
        return <View style={styles.userView}>
            <Text style={styles.heading}>Full Name</Text>
            <Text style={styles.detail}>• {item.name}</Text>
            <Text style={styles.heading}>User Name</Text>
            <Text style={styles.detail}>• {item.username}</Text>
            <Text style={styles.heading}>Email</Text>
            <Text style={styles.detail}>• {item.email}</Text>
            <Text style={styles.heading}>Website</Text>
            <Text style={styles.detail}>• {item.website}</Text>
            <View>
            <Text style={styles.heading}>Company</Text>
            <Text style={styles.detail}>• {item.company.name}</Text>
            <Text style={styles.detail}>• {item.company.catchPhrase}</Text>
            <Text style={styles.detail}>• {item.company.bs}</Text>
            </View>
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
var styles= StyleSheet.create({
    heading: {
        fontSize:20,
        fontWeight:'700',
        marginVertical:10,
        paddingLeft:2
    },
    detail : {
        fontSize:18,
        paddingLeft:20,
        margin:4
    },
    userView:{
        padding:10,
        borderColor:'#000',
        borderRadius:10,
        margin:10,
        borderWidth:2
    }
})
export default UserScreen;
