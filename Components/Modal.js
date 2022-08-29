import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default _Modal = ({style, children, setShow, show, onHide }) => {

  return (
    <View style={[styles.centeredView]}>
      <Modal supportedOrientations={['portrait', 'landscape']}
       animationType="fade" transparent={true} visible={show}>
        <View style={[styles.centeredView, ,{backgroundColor: '#6669'}]}>
          <View style={[styles.modalView,style]}>
            <Icon onPress={() => setShow(false)} name={"remove"} size={22} color="#f55" style={{ position: 'absolute', left: 9, top: 9, zIndex:111 }} />
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 5,
    width: 230,
    height: 125,
    shadowColor: "#000",
    shadowOpacity: .8,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 2
    },
  },
});