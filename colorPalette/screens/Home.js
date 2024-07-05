import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { useState, useCallback, useEffect } from "react";

import PreviewPalette from "../components/PreviewPalette";

const Home = ({ navigation, route }) => {
  const [paletteColors, setPaletteColors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const addNewPalettes = useCallback(() => {
    if (route && route.params) {
      console.log("length is ", paletteColors.length);
      const newPalette = {
        id: paletteColors.length,
        paletteName: route.params.paletteName,
        colors: route.params.colors,
      };
      setPaletteColors((prevstate) => [newPalette, ...prevstate]);
    }
  }, [route]);

  const fetchColorPalettes = useCallback(async () => {
    const res = await fetch(
      "https://color-palette-api.kadikraman.vercel.app/palettes",
    );
    if (!res.ok) return;
    const resData = await res.json();
    let allPalettes = [];
    allPalettes = [...allPalettes, ...resData];
    setPaletteColors(allPalettes);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchColorPalettes();
    console.log("Fetching palletes from api");
  }, []);

  useEffect(() => {
    addNewPalettes();
    console.log("Refreshing Palletes");
  }, [addNewPalettes]);

  return (
    <FlatList
      data={paletteColors}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ColorPalette", {
              paletteName: item.paletteName,
              colors: item.colors,
            });
          }}
        >
          <PreviewPalette
            colors={item.colors.slice(0, 5)}
            paletteName={item.paletteName}
          />
        </TouchableOpacity>
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      // refreshControl={<RefreshControl refreshing={true} onRefresh={() => {}}/>}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ColorPaletteModal");
          }}
        >
          <Text style={styles.modalText}>Add a color palette</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  modalText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default Home;
