import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gameField}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  gameField: {
    flex: 1,
    width: "100%",
    borderWidth: 4, // Breite des Rahmens
    borderColor: "black", // Farbe des Rahmens
  },
});
