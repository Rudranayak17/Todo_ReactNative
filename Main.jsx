import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./component/Footer";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Verify from "./screens/Verify";

import CameraComponent from "./screens/Camera";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action";
import Loader from "./component/Loader";
import ChangePassword from "./screens/ChangePassword";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="camera" component={CameraComponent} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="verify" component={Verify} />
          <Stack.Screen name="forgetpassword" component={ForgetPassword} />
          <Stack.Screen name="resetpassword" component={ResetPassword} />
          <Stack.Screen name="changepassword" component={ChangePassword} />
        </Stack.Group>
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Main;
