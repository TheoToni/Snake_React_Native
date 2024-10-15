import { StyleSheet, SafeAreaView } from "react-native";
import Gamefield from "./components/Gamefield";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Gamefield />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
