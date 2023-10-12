import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/AntDesign";
const Footer = () => {
    const navgation=useNavigation()
  return (
    <View 
    style={{
        padding:30,
        backgroundColor:"#fff",
        flexDirection:"row",
        justifyContent:"space-around"
    }}
    
    >
     <TouchableOpacity onPress={()=>navgation.navigate("home")}>
        <Icon name="home" size={30} color="#900"/>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>navgation.navigate("profile")}>
        <Icon name="user" size={30} color="#900"/>
     </TouchableOpacity>
    </View>
  )
}
export default Footer