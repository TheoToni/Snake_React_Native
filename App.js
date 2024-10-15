import { StyleSheet, View } from "react-native";
import Gamefield from "./components/Gamefield";

export default function App() {
  return (
    <View style={styles.container}>
      <Gamefield />
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
});
