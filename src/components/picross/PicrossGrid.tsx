import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { usePicrossStore } from '../../store/usePicrossStore';
import { PicrossCell } from './PicrossCell';
import { theme } from '../../theme';
import * as Haptics from 'expo-haptics';

export const PicrossGrid: React.FC = () => {
  const { grid, toggleCell } = usePicrossStore();

  if (!grid) return null;

  const { size, cells, clues } = grid;

  const handleCellPress = useCallback((r: number, c: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleCell(r, c);
  }, [toggleCell]);

  const maxRowClues = Math.max(...clues.rows.map(r => r.length));
  const maxColClues = Math.max(...clues.cols.map(c => c.length));

  return (
    <View style={styles.container}>
      {/* Top Clues */}
      <View style={styles.topCluesContainer}>
        <View style={{ flex: maxRowClues }} />
        <View style={[styles.topCluesBox, { flex: size }]}>
          {clues.cols.map((colClue, cIndex) => (
            <View key={`colClue-${cIndex}`} style={styles.colClueColumn}>
              {colClue.map((num, i) => (
                <Text key={i} style={styles.clueText}>
                  {num === 0 ? '' : num}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Main Grid Area */}
      <View style={styles.mainArea}>
        {/* Left Clues */}
        <View style={[styles.leftCluesBox, { flex: maxRowClues }]}>
          {clues.rows.map((rowClue, rIndex) => (
            <View key={`rowClue-${rIndex}`} style={styles.rowClueRow}>
              {rowClue.map((num, i) => (
                <Text key={i} style={styles.clueText}>
                  {num === 0 ? '' : num}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* The Grid */}
        <View style={[styles.gridBox, { flex: size }]}>
          {cells.map((row, r) => (
            <View key={`row-${r}`} style={styles.gridRow}>
              {row.map((cell, c) => (
                <PicrossCell
                  key={`cell-${r}-${c}`}
                  state={cell.state}
                  row={r}
                  col={c}
                  isBorderRightThick={(c + 1) % 5 === 0 && c !== size - 1}
                  isBorderBottomThick={(r + 1) % 5 === 0 && r !== size - 1}
                  onPress={handleCellPress}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
  },
  topCluesContainer: {
    flexDirection: 'row',
  },
  topCluesBox: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(99, 102, 241, 0.2)', // Soft indigo divider
  },
  colClueColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 6,
  },
  mainArea: {
    flex: 1,
    flexDirection: 'row',
  },
  leftCluesBox: {
    justifyContent: 'space-between',
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(99, 102, 241, 0.2)', // Soft indigo divider
  },
  rowClueRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
    gap: 4,
  },
  clueText: {
    fontSize: 10,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textSecondary,
    fontFamily: 'System',
  },
  gridBox: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
