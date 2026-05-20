import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { CellState } from '../../types/picross';
import { theme } from '../../theme';

interface PicrossCellProps {
  state: CellState;
  row: number;
  col: number;
  onPress: (row: number, col: number) => void;
  isBorderRightThick: boolean;
  isBorderBottomThick: boolean;
}

export const PicrossCell = React.memo<PicrossCellProps>(({ 
  state, 
  row,
  col,
  onPress, 
  isBorderRightThick, 
  isBorderBottomThick 
}) => {
  const scaleAnim = useRef(new Animated.Value(state === 'filled' ? 1 : 0)).current;
  const crossAnim = useRef(new Animated.Value(state === 'crossed' ? 1 : 0)).current;

  // Spring animation when filled state changes
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: state === 'filled' ? 1 : 0,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [state === 'filled']);

  // Spring animation when crossed state changes
  useEffect(() => {
    Animated.spring(crossAnim, {
      toValue: state === 'crossed' ? 1 : 0,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [state === 'crossed']);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(row, col)}
      style={[
        styles.cell,
        isBorderRightThick && styles.borderRightThick,
        isBorderBottomThick && styles.borderBottomThick,
      ]}
    >
      {/* Filled Inset Square */}
      <Animated.View 
        style={[
          styles.filled, 
          { transform: [{ scale: scaleAnim }] }
        ]} 
      />

      {/* Crossed Mark */}
      {state === 'crossed' && (
        <Animated.View 
          style={[
            styles.crossContainer, 
            { transform: [{ scale: crossAnim }] }
          ]}
        >
          <View style={[styles.crossLine, { transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.crossLine, { transform: [{ rotate: '-45deg' }] }]} />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: theme.colors.borderGlass,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  borderRightThick: {
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(99, 102, 241, 0.3)', // Translucent indigo divider
  },
  borderBottomThick: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(99, 102, 241, 0.3)',
  },
  filled: {
    position: 'absolute',
    width: '88%',
    height: '88%',
    borderRadius: 5,
    backgroundColor: theme.colors.picrossFilled,
  },
  crossContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossLine: {
    position: 'absolute',
    width: '56%',
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: theme.colors.picrossCrossed,
  }
});
