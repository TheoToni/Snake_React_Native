import { View, StyleSheet, Dimensions } from "react-native";
import Snake from "./Snake";

const { width, height } = Dimensions.get("window");

export default function Gamefield() {
  return (
    <View style={styles.gameField}>
      <Snake />
    </View>
  );
}

const styles = StyleSheet.create({
  gameField: {
    width: width - 40, // Breite um Padding reduziert
    height: height - 200, // Höhe um Platz für andere UI-Elemente reduziert
    borderWidth: 10,
    borderColor: "black",
    overflow: "hidden",
    position: "relative", // Positionierung der Schlange relativ zur Gamefield
    backgroundColor: "#f0f0f0", // Helle Hintergrundfarbe zur besseren Sichtbarkeit
  },
});
