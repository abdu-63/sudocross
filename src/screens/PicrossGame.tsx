import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert } from 'react-native';
import { usePicrossStore } from '../store/usePicrossStore';
import { PicrossGrid } from '../components/picross/PicrossGrid';
import { PicrossControls } from '../components/picross/Controls';
import { theme } from '../theme';
import { ChevronLeftIcon, LightbulbIcon, SettingsIcon, RefreshIcon } from '../components/Icons';
import { ScaleButton } from '../components/ScaleButton';
import { VictoryOverlay } from '../components/VictoryOverlay';
import * as Haptics from 'expo-haptics';

interface PicrossGameProps {
  onBack: () => void;
}

export const PicrossGame: React.FC<PicrossGameProps> = ({ onBack }) => {
  const { initGame, grid, revealHint } = usePicrossStore();

  useEffect(() => {
    // Wait for zustand/persist hydration then default to 10x10 if no saved game
    const unsubscribe = usePicrossStore.persist.onFinishHydration(() => {
      if (!usePicrossStore.getState().grid) {
        initGame(10);
      }
    });
    // If already hydrated (e.g. hot-reload), check immediately
    if (usePicrossStore.persist.hasHydrated() && !grid) {
      initGame(10);
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (grid?.isComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [grid?.isComplete]);

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Paramètres Picross",
      "Choisissez la taille de la grille pour lancer une nouvelle partie :",
      [
        { text: "5x5 (Facile)", onPress: () => initGame(5) },
        { text: "10x10 (Moyen)", onPress: () => initGame(10) },
        { text: "15x15 (Difficile)", onPress: () => initGame(15) },
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
    const size = grid?.size || 10;
    Alert.alert(
      "Recommencer",
      "Voulez-vous recommencer cette grille ?",
      [
        { text: "Oui, recommencer", onPress: () => initGame(size) },
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
        <Text style={styles.title}>Picross</Text>
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
        <View style={styles.gridWrapper}>
          <PicrossGrid />
        </View>
        
        <View style={styles.bottomArea}>
          {!grid.isComplete && <PicrossControls />}
        </View>
      </View>

      <VictoryOverlay
        isVisible={grid.isComplete}
        onNewGame={() => initGame(grid.size)}
        title="Picross Résolu !"
        subtitle="Félicitations ! Le dessin a été révélé avec succès."
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  gridWrapper: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
  },
  bottomArea: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 24,
  },
});
