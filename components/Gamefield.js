import { StyleSheet } from "react-native";
import { View } from "react-native";
import Snake from "./Snake";

export default function Gamefield() {
  return (
    <View style={styles.gameField}>
      <Snake />
    </View>
  );
}

const styles = StyleSheet.create({
  gameField: {
    flex: 1,
    width: "100%",
    borderWidth: 4,
    borderColor: "black",
  },
});
