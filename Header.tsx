import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { selectedButtonState } from "./Atoms";

const Header = () => {
  const [selectedButton, setSelectedButton] =
    useRecoilState(selectedButtonState);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="My Buddies"
        onPress={() => handleButtonPress("myBuddies")}
        isSelected={selectedButton === "myBuddies"}
      />
      <Button
        title="Pending"
        onPress={() => handleButtonPress("pending")}
        isSelected={selectedButton === "pending"}
      />
    </View>
  );
};

const Button = ({ title, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={onPress}
    >
      <Text
        style={{ color: isSelected ? "#6C63FF" : "black", fontWeight: "600" }}
      >
        {title}
      </Text>
      {isSelected && <View style={styles.selectedLine} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  selectedButton: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#6C63FF",
  },
  selectedLine: {
    height: 0.5,
    backgroundColor: "#6C63FF",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default Header;
