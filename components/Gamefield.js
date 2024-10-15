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
    width: width - 40, // Reduziere die Breite um Padding
    height: height - 200, // Reduziere die Höhe, um Platz für andere UI-Elemente zu schaffen
    borderWidth: 4,
    borderColor: "black",
    overflow: "hidden",
  },
});
