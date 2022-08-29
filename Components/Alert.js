import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const App = () => {


  const alt = () =>{
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {text: "Cancel", onPress: () => console.log("Cancel Pressed")},
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
}
  return (
    <View style={styles.container}>
      <Button title={"Button Alert"} onPress={alt} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;