import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSudokuStore } from '../../store/useSudokuStore';
import { SudokuCell } from './SudokuCell';
import { theme } from '../../theme';
import * as Haptics from 'expo-haptics';

export const SudokuGrid: React.FC = () => {
  const { grid, selectedCell, selectCell } = useSudokuStore();

  if (!grid) return null;

  const handleSelectCell = useCallback((r: number, c: number) => {
    Haptics.selectionAsync();
    selectCell(r, c);
  }, [selectCell]);

  return (
    <View style={styles.gridContainer}>
      {grid.cells.map((row, r) => (
        <View key={`row-${r}`} style={styles.row}>
          {row.map((cell, c) => {
            const isSelected = selectedCell?.row === r && selectedCell?.col === c;
            const isHighlighted = !isSelected && selectedCell && (
              selectedCell.row === r || 
              selectedCell.col === c ||
              (Math.floor(selectedCell.row / 3) === Math.floor(r / 3) && Math.floor(selectedCell.col / 3) === Math.floor(c / 3))
            );

            return (
              <SudokuCell
                key={`cell-${r}-${c}`}
                cell={cell}
                isSelected={isSelected}
                isHighlighted={!!isHighlighted}
                onPress={handleSelectCell}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  }
});
