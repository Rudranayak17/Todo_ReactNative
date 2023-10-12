import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { loadUser, verify } from '../redux/action'
const Verify = () => {
  const dispatch=useDispatch()
  const navigate=useNavigation()
  const [otp,setOtp]=useState()
  const verifyHandler=async()=>{
await dispatch(verify(otp))
dispatch(loadUser())
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
      <Text style={{ fontSize: 20, margin: 20 }}>VERIFICATION</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
        />
   
      </View>
      <Button
     textColor='#fff'
        style={styles.btn}
onPress={verifyHandler}
      >
        Verify
      </Button>
     
    </View>
  )
}
export default Verify
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