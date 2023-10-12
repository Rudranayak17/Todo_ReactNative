import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { register } from "../redux/action";
import mime from "mime";
const Register = () => {
  const dispatch=useDispatch()
  const route = useRoute();
  const navigate = useNavigation();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerImage = () => {
    navigate.navigate("camera",{
      updateProfile:false
    });
  };
  const registerHandler = () => {
    const myForm=new FormData()
    myForm.append("name",name);
    myForm.append("email",email);
    myForm.append("password",password);
    myForm.append("avatar",{
      uri:avatar,
      type:mime.getType(avatar),
      name:avatar.split("/").pop()
    })
    dispatch(register(myForm))
  };
  useEffect(() => {
if (route.params) {
  if (route.params.image) {
    setAvatar(route.params.image)
  }
}
  }, [route]);

  return (
    <View
      style={{
        flex: 2,
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
      <TouchableOpacity onPress={handlerImage}>
        <Text style={{ color: "#900" }}>Change Photo</Text>
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        disabled={!email || !password || !name ||!avatar}
        style={styles.btn}
        onPress={registerHandler}
      >
        <Text style={{ color: "#fff" }}>REGISTER</Text>
      </Button>

      <TouchableOpacity onPress={() => navigate.navigate("login")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
          }}
        >
          Have an Account, Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Register;
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
