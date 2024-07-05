import { View, Text, StyleSheet, FlatList } from "react-native";

const PreviewColorBox = ({ hexCode }) => {
  const boxColor = {
    backgroundColor: hexCode,
  };
  // console.log(hexCode);
  return <View style={[styles.box, boxColor]} />;
};

const PreviewPalette = ({ colors, paletteName }) => {
  console.log(paletteName);
  console.log(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{paletteName}</Text>
      <FlatList
        // style={}
        data={colors}
        horizontal={true}
        renderItem={({ item }) => <PreviewColorBox hexCode={item.hexCode} />}
        keyExtractor={(item) => item.colorName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
  },

  container: {
    rowGap: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default PreviewPalette;
