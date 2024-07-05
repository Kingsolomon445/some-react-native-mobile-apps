import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ColorBox from "../components/ColorBox";

const ColorPalette = ({ route }) => {
  return (
    <FlatList
      style={styles.container}
      data={route.params.colors}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      keyExtractor={(item) => item.colorName}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  container: {
    // flex: 1,
  },
});

export default ColorPalette;
