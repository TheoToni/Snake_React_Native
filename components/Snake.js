import { View, StyleSheet } from "react-native";
import { useState } from "react";

export default function Snake() {
  const [segments, setSegments] = useState([{ x: 10, y: 10 }]);

  return (
    <View>
      {segments.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              left: segment.x,
              top: segment.y,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "green",
  },
});
