import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { useState, useEffect } from "react";

// Bildschirmabmessungen
const { width, height } = Dimensions.get("window");

export default function Snake() {
  // Startposition in der Mitte des Bildschirms
  const startX = Math.floor(width / 2);
  const startY = Math.floor(height / 2);

  const [segments, setSegments] = useState([
    { x: startX, y: startY },
    { x: startX, y: startY + 20 },
    { x: startX, y: startY + 40 },
  ]);
  const [direction, setDirection] = useState({ x: 0, y: -20 });
  const [food, setFood] = useState({ x: 0, y: 0 });

  const placeFood = () => {
    const maxX = width - 40; // Spielfeld-Breite minus Padding
    const maxY = height - 200; // Spielfeld-Höhe minus Platz für UI-Elemente
    const x = Math.floor(Math.random() * (maxX / 20)) * 20;
    const y = Math.floor(Math.random() * (maxY / 20)) * 20;
    setFood({ x, y });
  };

  useEffect(() => {
    placeFood();
  }, []);

  // Bewegungslogik
  useEffect(() => {
    const moveSnake = () => {
      setSegments((prevSegments) => {
        const newSegment = {
          x: prevSegments[0].x + direction.x,
          y: prevSegments[0].y + direction.y,
        };

        // Toleranz für die Kollisionsprüfung
        const tolerance = 20; // Toleranz in Pixeln

        // Kollisionsprüfung mit Nahrung unter Berücksichtigung der Toleranz
        if (
          newSegment.x < food.x + tolerance &&
          newSegment.x + 20 > food.x &&
          newSegment.y < food.y + tolerance &&
          newSegment.y + 20 > food.y
        ) {
          const newSegments = [newSegment, ...prevSegments];
          placeFood(); // Nahrung neu platzieren
          return newSegments; // Schlange wird länger
        }

        return [newSegment, ...prevSegments.slice(0, -1)];
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food]);

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
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      // Wische nach oben
      if (dy < -50 && direction.y === 0) {
        changeDirection({ x: 0, y: -20 });
      }
      // Wische nach unten
      else if (dy > 50 && direction.y === 0) {
        changeDirection({ x: 0, y: 20 });
      }
      // Wische nach links
      else if (dx < -50 && direction.x === 0) {
        changeDirection({ x: -20, y: 0 });
      }
      // Wische nach rechts
      else if (dx > 50 && direction.x === 0) {
        changeDirection({ x: 20, y: 0 });
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Snake Segmente */}
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

      {/* Nahrungsanzeige */}
      <View
        style={[
          styles.food,
          {
            left: food.x,
            top: food.y,
          },
        ]}
      />
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
  food: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
});
