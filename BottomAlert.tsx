import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import Modal from "react-native-modal";

const Row = ({ profilePic, itemName, switchValue }) => (
  <View style={styles.row}>
    <View style={styles.rowColumn}>
      <Image source={profilePic} style={styles.rowImage} />
      <Text style={{ marginLeft: 10 }}>{itemName}</Text>
    </View>
    <View style={styles.rowColumnSwitch}>
      <Switch value={switchValue} />
    </View>
  </View>
);

const BottomAlert = ({ isVisible, onClose, selectedItems }) => {
  const renderSingleItemContent = () => (
    <>
      <Row
        profilePic={selectedItems[0]?.profilePic}
        itemName={selectedItems[0]?.name}
        switchValue={true}
      />
      <Row
        profilePic={require("./assets/multi.png")}
        itemName={`${selectedItems[0]?.name}'s friends`}
        switchValue={true}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </>
  );

  const renderMultipleItemsContent = () => (
    <>
      <Row
        profilePic={selectedItems[0]?.profilePic}
        itemName={`${selectedItems[0]?.name}, ${selectedItems[1]?.name}${
          selectedItems.length > 2 ? `, +${selectedItems.length - 2}` : ""
        }`}
        switchValue={true}
      />
      <Row
        profilePic={require("./assets/multi.png")}
        itemName="Their friends"
        switchValue={true}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Hang With:</Text>
        {selectedItems.length === 1
          ? renderSingleItemContent()
          : renderMultipleItemsContent()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    color: "#6C63FF",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rowColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 5,
  },
  rowColumnSwitch: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  rowImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
  },
});

export default BottomAlert;
