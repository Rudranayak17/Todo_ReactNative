import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Task from "../component/task";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Dialog } from "react-native-paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";
const Home = () => {
  const {user}=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, message, error } = useSelector((state) => state.message);

 
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const hideDialogHandler = () => {
    setOpenDialog(!openDialog);
  };
  const addTaskHandler =async () => {
   await dispatch(addTask(title, description));
    dispatch(loadUser())
  };

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch({type:"clearError"})

    }
    if (message) {
      alert(message)
      dispatch({type:"clearMessage"})
    }

  }, [alert,error,message,dispatch]);
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Task</Text>
            {user&&user.tasks.map((i, index) => (
              <Task
                key={index}
                title={i.title}
                description={i.description}
                status={i.completed}
                taskId={i._id}
              />
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={hideDialogHandler}>
              <Icon name="add-to-list" size={20} color={"#900"} />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={hideDialogHandler}>
        <Dialog.Title>ADD A Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={hideDialogHandler}
            >
              <Text style={{ color: "black", fontSize: 15 }}>CANCEL</Text>
            </TouchableOpacity>
            <Button
              onPress={addTaskHandler}
              style={{ fontSize: 15 }}
              textColor="#900"
              disabled={!title ||!description||loading }
            >
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "#474747",
    color: "white",
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
