import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';

function HomeScreen(props) {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(blob => blob.json())
            .then(data => {
                setPosts(data);
            })
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(blob => blob.json())
            .then(data => {
                var userDictionary = {};
                data.forEach(user => {
                    userDictionary[user.id] = user.name;
                })
                setUsers(userDictionary);
            })
    }, []);

    const renderItem = ({ item }) => {
        return <View style={styles.postBorder}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("Post", { postId: item.id, username: users[item.userId],userId: item.userId });
            }}>
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("Users", { userId: item.userId });
            }}>
                <Text style={styles.username}>{users[item.userId]}</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};
var styles = StyleSheet.create({
    postBorder: { 
        padding: 10,
        borderColor: '#000', 
        borderRadius: 10, 
        margin: 10, 
        borderWidth: 2 
    },
    username: { 
        fontSize: 15, 
        justifyContent: 'flex-end', 
        alignSelf: 'flex-end', 
        paddingTop: 30 
    },
    title: { 
        fontSize: 20 
    },
})
export default HomeScreen;
