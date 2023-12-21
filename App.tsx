import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Header from "./Header";
import List from "./List";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        <Header />
        <List />
      </SafeAreaView>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 20,
  },
});

export default App;
