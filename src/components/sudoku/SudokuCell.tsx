import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated } from 'react-native';
import { SudokuCell as CellType } from '../../types/sudoku';
import { theme } from '../../theme';

interface SudokuCellProps {
  cell: CellType;
  isSelected: boolean;
  isHighlighted: boolean; // Ligne ou colonne sélectionnée
  onPress: (row: number, col: number) => void;
}

export const SudokuCell = React.memo<SudokuCellProps>(({ cell, isSelected, isHighlighted, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Spring animation when the number is entered
  useEffect(() => {
    if (cell.value) {
      scaleAnim.setValue(0.5);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [cell.value]);

  const getBackgroundColor = () => {
    if (cell.hasError) return 'rgba(239, 68, 68, 0.08)'; // Soft error red
    if (isSelected) return theme.colors.sudokuHighlight; // Indigo select color
    if (isHighlighted) return 'rgba(99, 102, 241, 0.04)'; // Light Indigo column/row guide
    return 'transparent';
  };

  const getTextColor = () => {
    if (cell.hasError) return theme.colors.error;
    if (cell.isGiven) return theme.colors.sudokuGiven;
    return theme.colors.sudokuInput;
  };

  const isBorderRightThick = cell.col === 2 || cell.col === 5;
  const isBorderBottomThick = cell.row === 2 || cell.row === 5;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(cell.row, cell.col)}
      style={[
        styles.cell,
        { backgroundColor: getBackgroundColor() },
        isBorderRightThick && styles.borderRightThick,
        isBorderBottomThick && styles.borderBottomThick,
      ]}
    >
      {cell.value ? (
        <Animated.Text style={[
          styles.text, 
          { 
            color: getTextColor(), 
            fontWeight: cell.isGiven ? theme.typography.weight.bold : theme.typography.weight.regular,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
          {cell.value}
        </Animated.Text>
      ) : (
        <View style={styles.notesContainer}>
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <Text key={num} style={[styles.noteText, { opacity: cell.notes.includes(num) ? 1 : 0 }]}>
              {num}
            </Text>
          ))}
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRightThick: {
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(99, 102, 241, 0.3)', // Translucent indigo block border
  },
  borderBottomThick: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(99, 102, 241, 0.3)',
  },
  text: {
    fontSize: theme.typography.size.xl,
    fontFamily: 'System',
  },
  notesContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  noteText: {
    width: '33%',
    height: '33%',
    fontSize: 9,
    textAlign: 'center',
    color: theme.colors.sudokuNotes,
  }
});
