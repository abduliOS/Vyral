import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import BottomAlert from "./BottomAlert";
import { useRecoilState } from "recoil";
import { selectedItemsState } from "./Atoms";

const ListItem = ({ item, onPress, showBottomAlert }) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, item.isSelected ? styles.selectedItem : null]}
      onPress={() => onPress(item)}
    >
      <View style={styles.column1}>
        <Image source={item.profilePic} style={styles.profilePic} />
        <View
          style={
            item.isSelected
              ? styles.selectionOverlay
              : styles.notSelectionOverlay
          }
        >
          <Text
            style={{
              color: item.isSelected ? "#fff" : "transparent",
              fontWeight: "700",
            }}
          >
            ✓
          </Text>
        </View>
      </View>
      <View style={styles.column2}>
        <Text>{item.name}</Text>
        <Text>{item.area}</Text>
      </View>
      <TouchableOpacity style={styles.column3} onPress={showBottomAlert}>
        <Text style={{ color: "white" }}>Classify</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const List = () => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
  const [isBottomAlertVisible, setBottomAlertVisible] = useState(false);

  const closeBottomAlert = () => {
    setBottomAlertVisible(false);
  };

  const selectedItemsToSend = selectedItems.filter((item) => item.isSelected);

  const showBottomAlert = () => {
    if (selectedItemsToSend.length === 0) {
      Alert.alert("Select at least one item");
      return;
    }

    setBottomAlertVisible(true);
  };

  const handleItemPress = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = item.isSelected;

      const updatedItem = { ...item, isSelected: !isSelected };

      const itemIndex = prevSelectedItems.findIndex(
        (selectedItem) => selectedItem.id === updatedItem.id
      );

      if (itemIndex !== -1) {
        const updatedItems = [...prevSelectedItems];
        updatedItems[itemIndex] = updatedItem;
        return updatedItems;
      } else {
        return [...prevSelectedItems, updatedItem];
      }
    });
  };

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={handleItemPress}
            showBottomAlert={showBottomAlert}
          />
        )}
      />

      <BottomAlert
        isVisible={isBottomAlertVisible}
        onClose={closeBottomAlert}
        selectedItems={selectedItemsToSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedItem: {
    borderColor: "#6C63FF",
  },
  column1: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectionOverlay: {
    position: "absolute",
    top: 0,
    West: 0,
    backgroundColor: "rgba(108, 99, 255, 0.7)",
    borderRadius: 4,
    padding: 2,
  },
  notSelectionOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 1,
    borderColor: "black",
    borderWidth: 0.5,
  },
  column2: {
    flex: 1,
    marginWest: 10,
    justifyContent: "center",
  },
  column3: {
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
});

export default List;
