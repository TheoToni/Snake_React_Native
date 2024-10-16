import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { useState, useEffect } from "react";

// Bildschirmabmessungen
const { width, height } = Dimensions.get("window");
const [food, setFood] = useState([{ x: 50, y: 150 }]);

export default function Snake() {
  // Startposition in der Mitte des Bildschirms
  const startX = Math.floor(width / 2);
  const startY = Math.floor(height / 2);

  const [segments, setSegments] = useState([
    { x: startX, y: startY },
    { x: startX, y: startY + 20 }, // Nächstes Segment direkt darunter
    { x: startX, y: startY + 40 }, // Nächstes Segment darunter
  ]);
  const [direction, setDirection] = useState({ x: 0, y: -20 }); // Bewegung nach oben

  // Bewegungslogik
  useEffect(() => {
    const moveSnake = () => {
      setSegments((prevSegments) => {
        const newSegment = {
          x: prevSegments[0].x + direction.x,
          y: prevSegments[0].y + direction.y,
        };
        return [newSegment, ...prevSegments.slice(0, -1)];
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction]);

  // Funktion zur Handhabung der Richtung
  const changeDirection = (newDirection) => {
    if (
      (newDirection.x === -direction.x && newDirection.y === -direction.y) ||
      (direction.x === 0 && direction.y === 0) // verhindert sofortige Umkehr
    ) {
      return; // keine Richtung ändern
    }
    setDirection(newDirection);
  };

  // PanResponder für Wischgesten einrichten
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      // Wische nach oben
      if (dy < -50) {
        changeDirection({ x: 0, y: -20 });
      }
      // Wische nach unten
      else if (dy > 50) {
        changeDirection({ x: 0, y: 20 });
      }
      // Wische nach links
      else if (dx < -50) {
        changeDirection({ x: -20, y: 0 });
      }
      // Wische nach rechts
      else if (dx > 50) {
        changeDirection({ x: 20, y: 0 });
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  segment: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "green",
  },
});
