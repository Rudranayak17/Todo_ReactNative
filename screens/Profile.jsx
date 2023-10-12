import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import { loadUser, logout, updateProfile } from "../redux/action";
import mime from "mime";
const Profile = () => {
  const route = useRoute();
  const dispatch =useDispatch()
  const navigation=useNavigation()
  const {user,loading}=useSelector(state=>state.auth)

  const [avatar, setAvatar] = useState(user.avatar.url);
  const [name, setName] = useState(user.name);
  const handleImage = () => {
    navigation.navigate("camera",{
      updateProfile:true
    })
  };
  const submitHandler = async() => {
    const myForm=new FormData()
    myForm.append("name",name);
    myForm.append("avatar",{
      uri:avatar,
      type:mime.getType(avatar),
      name:avatar.split("/").pop()
    })
    await dispatch(updateProfile(myForm))
    dispatch(loadUser())
  };
  const logoutHandler = () => {
    dispatch(logout())
  };
  useEffect(() => {
if (route.params) {
  if (route.params.image) {
    setAvatar(route.params.image)
  }
}
  }, [route]);

  return (
    loading?<Loader/>:(
      <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{ backgroundColor: "#900" }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900" }}>Change Photo</Text>
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button
      
      disabled={loading}
       style={styles.btn} onPress={submitHandler}>
        <Text style={{ color: "#fff" }}>Update</Text>
      </Button>
      <Button style={{
        margin:20
      }} textColor="rgb(50,50,50)" onPress={()=>navigation.navigate("changepassword")}>
       Change Password
      </Button>
      <Button onPress={logoutHandler}>
       LOGOUT
      </Button>
     {user.verified?null: <Button  onPress={()=>navigation.navigate("verify")}>
        verify
      </Button> }
    </View>
    )
  );
};
export default Profile;
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
