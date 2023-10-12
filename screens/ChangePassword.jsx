import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { updatePassword } from '../redux/action';
import { useNavigation } from '@react-navigation/native';
const ChangePassword = () => {
    const navigation=useNavigation()
    const dispatch=useDispatch()
const [oldPassword, setOldPassword] =useState("");
const [newPassword, setNewPassWord] =useState("");

   const  changePasswordHandler=()=>{
dispatch(updatePassword(oldPassword, newPassword))
navigation.navigate("profile")

   }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>Update Password</Text>
      <View style={{ width: "70%" }}>
  
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassWord}
        />
      </View>
      <Button
   textColor='#fff'
        style={styles.btn}
        onPress={changePasswordHandler}
      >
      CHANGE
      </Button>
      
   
    </View>
  )
}
export default ChangePassword
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