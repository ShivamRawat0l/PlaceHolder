import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

function PostScreen({ route, navigation }) {

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { postId, username,userId } = route.params;
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?id=' + postId)
      .then(blob => blob.json())
      .then(data => {
        setPost(data[0]);
      })
    fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId)
      .then(blob => blob.json())
      .then(data => {
        setComments(data);
      })
  }, []);


  const RenderComments = ({ item }) => {
    return <View style={styles.post}>
      <Text style={styles.commentName}>{item.name}</Text>
      <Text style={styles.commentBody}>{item.body}</Text>
      <Text style={styles.commentEmail}>{item.email}</Text>
    </View>
  }
  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10, borderColor: '#000', borderRadius: 10, margin: 10, borderWidth: 2 }}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <TouchableOpacity onPress={() => {
                navigation.navigate("Users", { userId: userId });
            }}>
          <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.commentHeading}>Comments ▼</Text>
        {comments.map((data, index) => {
          return <RenderComments key={index} item={data} />
        })}

      </ScrollView>
    </View>
  );
};
var styles = StyleSheet.create({
  post: { 
    padding: 10, 
    borderColor: '#000', 
    borderRadius: 10, 
    margin: 10, 
    borderWidth: 2 
  },
  title: { 
    fontSize: 24, 
    padding: 6, 
    marginVertical: 10 ,
    fontWeight:'bold'
  },
  body: { 
    fontSize: 18, 
    padding: 6 
  },
  username: {
    fontSize: 15,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingTop: 30
  },
  commentHeading: { 
    fontSize: 18, 
    paddingLeft: 10,
    paddingVertical:20,
    marginTop:20, 
    justifyContent:'center',
    alignSelf:'flex-start' 
  },
  commentName : { 
    fontSize: 20,
    fontWeight:'600',
    padding:6
  },
  commentBody: { 
    fontSize: 15 ,
    padding:6
  } ,
  commentEmail: { 
    fontSize: 15 ,
    fontWeight:'bold',
    padding:6 
  }
})
export default PostScreen;
