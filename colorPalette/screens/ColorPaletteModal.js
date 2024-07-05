import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";

import colors from "./data/colors.json";

const Separator = () => <View style={styles.separator} />;

const ToggleColor = ({ colorName, hexCode, handleSelection }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);
    handleSelection(colorName, hexCode, !isEnabled);
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.text}>{colorName}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#8fbc8f" }}
        thumbColor={isEnabled ? "#3cb371" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const ColorPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState("");

  const [colorsAdded, setColorsAdded] = useState([]);

  const handleSelection = (colorName, hexCode, isSelected) => {
    const color = { colorName: colorName, hexCode: hexCode };
    if (isSelected) {
      console.log([...colorsAdded, color]);
      setColorsAdded((prevState) => [...colorsAdded, color]);
    } else {
      setColorsAdded((prevState) =>
        colorsAdded.filter((color) => color.colorName !== colorName),
      );
    }
  };

  const onSubmit = () => {
    if (colorsAdded.length < 3) {
      Alert.alert("Selected colors must be 3 or more!");
      return;
    }
    if (!paletteName) {
      Alert.alert("Palette name cannot be empty!");
      return;
    }
    navigation.navigate("Home", {
      paletteName: paletteName,
      colors: colorsAdded,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Name of your color palette</Text>
        <TextInput
          style={styles.input}
          value={paletteName}
          maxLength={30}
          onChangeText={setPaletteName}
        />
      </View>
      <FlatList
        data={colors}
        renderItem={({ item }) => (
          <ToggleColor
            colorName={item.colorName}
            hexCode={item.hexCode}
            handleSelection={handleSelection}
          />
        )}
        keyExtractor={(item) => item.colorName}
        ItemSeparatorComponent={<Separator />}
      />
      <Button title="Submit" color="green" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 30,
    rowGap: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ColorPaletteModal;
