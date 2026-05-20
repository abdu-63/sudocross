import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { useSudokuStore } from '../store/useSudokuStore';
import { SudokuGrid } from '../components/sudoku/SudokuGrid';
import { Numpad } from '../components/sudoku/Numpad';
import { theme } from '../theme';
import { ChevronLeftIcon, LightbulbIcon, SettingsIcon, RefreshIcon } from '../components/Icons';
import { ScaleButton } from '../components/ScaleButton';
import { VictoryOverlay } from '../components/VictoryOverlay';
import * as Haptics from 'expo-haptics';

interface SudokuGameProps {
  onBack: () => void;
}

export const SudokuGame: React.FC<SudokuGameProps> = ({ onBack }) => {
  const { initGame, grid, revealHint } = useSudokuStore();

  useEffect(() => {
    // Wait for zustand/persist hydration then default to medium if no saved game
    const unsubscribe = useSudokuStore.persist.onFinishHydration(() => {
      if (!useSudokuStore.getState().grid) {
        initGame('medium');
      }
    });
    // If already hydrated (e.g. hot-reload), check immediately
    if (useSudokuStore.persist.hasHydrated() && !grid) {
      initGame('medium');
    }
    return unsubscribe;
  }, []);

  // Déclencher une vibration de succès lors de la complétion
  useEffect(() => {
    if (grid?.isComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [grid?.isComplete]);

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Paramètres Sudoku",
      "Choisissez une difficulté pour lancer une nouvelle partie :",
      [
        { text: "Facile (Easy)", onPress: () => initGame('easy') },
        { text: "Moyen (Medium)", onPress: () => initGame('medium') },
        { text: "Difficile (Hard)", onPress: () => initGame('hard') },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  const handleHintPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    revealHint();
  };

  const handleRestartPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Recommencer",
      "Voulez-vous recommencer cette partie ?",
      [
        { text: "Oui, recommencer", onPress: () => initGame('medium') },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  if (!grid) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ScaleButton style={styles.iconButton} onPress={onBack}>
          <ChevronLeftIcon color={theme.colors.text} />
        </ScaleButton>
        <Text style={styles.title}>Sudoku</Text>
        <View style={styles.headerActions}>
          <ScaleButton style={styles.iconButton} onPress={handleHintPress}>
            <LightbulbIcon color={theme.colors.text} />
          </ScaleButton>
          <ScaleButton style={styles.iconButton} onPress={handleRestartPress}>
            <RefreshIcon size={20} color={theme.colors.text} />
          </ScaleButton>
          <ScaleButton style={styles.iconButton} onPress={handleSettingsPress}>
            <SettingsIcon color={theme.colors.text} />
          </ScaleButton>
        </View>
      </View>
      
      <View style={styles.container}>
        <SudokuGrid />
        
        <View style={styles.bottomArea}>
          {!grid.isComplete && <Numpad />}
        </View>
      </View>

      <VictoryOverlay
        isVisible={grid.isComplete}
        onNewGame={() => initGame('medium')}
        title="Sudoku Résolu !"
        subtitle="Bravo ! Vous avez terminé la grille avec succès."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: theme.colors.borderGlass,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomArea: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 24,
  },
});

