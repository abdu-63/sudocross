import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSudokuStore } from '../../store/useSudokuStore';
import * as Haptics from 'expo-haptics';
import { theme } from '../../theme';
import { TrashIcon, PencilIcon } from '../Icons';
import { ScaleButton } from '../ScaleButton';

export const Numpad: React.FC = () => {
  const { inputNumber, clearCell, isNotesMode, toggleNotesMode } = useSudokuStore();

  const handleInput = (num: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    inputNumber(num);
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearCell();
  };

  const handleToggleNotes = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    toggleNotesMode();
  };

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {nums.slice(0, 5).map(num => (
          <ScaleButton key={num} style={styles.button} onPress={() => handleInput(num)}>
            <Text style={styles.buttonText}>{num}</Text>
          </ScaleButton>
        ))}
      </View>
      <View style={styles.row}>
        {nums.slice(5, 9).map(num => (
          <ScaleButton key={num} style={styles.button} onPress={() => handleInput(num)}>
            <Text style={styles.buttonText}>{num}</Text>
          </ScaleButton>
        ))}
        <ScaleButton style={styles.buttonAction} onPress={handleClear}>
          <TrashIcon size={22} color={theme.colors.textSecondary} />
        </ScaleButton>
      </View>
      <View style={styles.controlsRow}>
        <ScaleButton 
          style={[styles.notesButton, isNotesMode && styles.notesButtonActive]} 
          onPress={handleToggleNotes}
        >
          <View style={styles.notesButtonContent}>
            <PencilIcon 
              size={16} 
              color={isNotesMode ? theme.colors.surface : theme.colors.textSecondary} 
            />
            <Text style={[styles.notesButtonText, isNotesMode && styles.notesButtonTextActive]}>
              Brouillon
            </Text>
          </View>
        </ScaleButton>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonText: {
    fontSize: theme.typography.size.xl,
    color: theme.colors.primary,
    fontWeight: theme.typography.weight.medium,
  },
  buttonAction: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: theme.colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActionText: {
    fontSize: theme.typography.size.lg,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weight.bold,
  },
  controlsRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  notesButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
  },
  notesButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notesButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  notesButtonText: {
    fontSize: theme.typography.size.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weight.semibold,
  },
  notesButtonTextActive: {
    color: theme.colors.surface,
  }
});
