import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, ViewStyle, StyleProp } from 'react-native';

// Minimum milliseconds between two accepted presses on the same button
const DEBOUNCE_MS = 300;

interface ScaleButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  /** Override the default debounce delay in ms (set to 0 to disable). */
  debounceMs?: number;
}

export const ScaleButton: React.FC<ScaleButtonProps> = ({
  onPress,
  style,
  children,
  debounceMs = DEBOUNCE_MS,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  // Timestamp of the last accepted press – used to debounce rapid taps
  const lastPressTime = useRef<number>(0);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
      tension: 350,
      friction: 12,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 350,
      friction: 12,
    }).start();
  };

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPressTime.current < debounceMs) {
      // Too soon – ignore this tap
      return;
    }
    lastPressTime.current = now;
    onPress?.();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
