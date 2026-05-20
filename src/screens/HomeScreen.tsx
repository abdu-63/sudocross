import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { theme } from '../theme';
import { SudokuIllustration, PicrossIllustration, ChevronLeftIcon } from '../components/Icons';
import { ScaleButton } from '../components/ScaleButton';

interface HomeScreenProps {
  onSelectGame: (
    game: 'sudoku' | 'picross',
    config?: { difficulty?: 'easy' | 'medium' | 'hard'; size?: 5 | 10 | 15 }
  ) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectGame }) => {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const sudokuAnim = useRef(new Animated.Value(0)).current;
  const picrossAnim = useRef(new Animated.Value(0)).current;

  // Selected game and level configuration
  const [selectedGame, setSelectedGame] = useState<'sudoku' | 'picross' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | number>('medium');

  const selectionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.timing(titleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(sudokuAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(picrossAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressCard = (game: 'sudoku' | 'picross') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedGame(game);
    setSelectedLevel(game === 'sudoku' ? 'medium' : 10);

    // Transition animation
    Animated.timing(selectionAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const handleBackToGames = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.timing(selectionAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSelectedGame(null);
    });
  };

  const handleStartGame = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (selectedGame === 'sudoku') {
      onSelectGame('sudoku', { difficulty: selectedLevel as 'easy' | 'medium' | 'hard' });
    } else if (selectedGame === 'picross') {
      onSelectGame('picross', { size: selectedLevel as 5 | 10 | 15 });
    }
  };

  const makeAnimStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  });

  // Animation values for cross-fading layouts
  const cardsContainerStyle = {
    opacity: selectionAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    }),
    transform: [{
      translateY: selectionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -30]
      })
    }]
  };

  const selectorContainerStyle = {
    opacity: selectionAnim,
    transform: [{
      translateY: selectionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
      })
    }]
  };

  const sudokuLevels = [
    { key: 'easy', title: 'Facile (Easy)', desc: 'Idéal pour s\'initier au Sudoku de façon détendue.' },
    { key: 'medium', title: 'Moyen (Medium)', desc: 'Le juste équilibre pour stimuler vos méninges.' },
    { key: 'hard', title: 'Difficile (Hard)', desc: 'Un défi intense pour les experts en logique.' },
  ];

  const picrossLevels = [
    { key: 5, title: 'Grille 5 x 5 (Facile)', desc: 'Partie rapide pour comprendre les bases.' },
    { key: 10, title: 'Grille 10 x 10 (Moyen)', desc: 'Format classique avec un bon compromis de dessin.' },
    { key: 15, title: 'Grille 15 x 15 (Difficile)', desc: 'Grande grille complexe pour les passionnés.' },
  ];

  const currentLevels = selectedGame === 'sudoku' ? sudokuLevels : picrossLevels;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Dynamic Header */}
        <Animated.View style={[styles.header, makeAnimStyle(titleAnim)]}>
          {selectedGame !== null ? (
            <View style={styles.selectionHeaderRow}>
              <ScaleButton style={styles.iconButton} onPress={handleBackToGames}>
                <ChevronLeftIcon color={theme.colors.text} size={20} />
              </ScaleButton>
              <View style={styles.selectionTitleContainer}>
                <Text style={styles.selectionTitle}>
                  {selectedGame === 'sudoku' ? 'Sudoku' : 'Picross'}
                </Text>
                <Text style={styles.selectionSubtitle}>
                  {selectedGame === 'sudoku' ? 'Choisissez la difficulté' : 'Choisissez la taille'}
                </Text>
              </View>
              <View style={{ width: 44 }} /> {/* Layout balance spacing */}
            </View>
          ) : (
            <>
              <Text style={styles.title}>SudoCross</Text>
              <Text style={styles.subtitle}>Choisissez votre défi</Text>
            </>
          )}
        </Animated.View>

        <View style={styles.viewsContainer}>
          {/* 1. Game Selection Cards */}
          <Animated.View 
            style={[styles.cardsContainer, cardsContainerStyle]}
            pointerEvents={selectedGame === null ? 'auto' : 'none'}
          >
            <Animated.View style={[styles.cardWrapper, makeAnimStyle(sudokuAnim)]}>
              <ScaleButton
                style={styles.card}
                onPress={() => handlePressCard('sudoku')}
              >
                <SudokuIllustration style={styles.illustration} />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>Sudoku</Text>
                  <Text style={styles.cardDescription}>Les chiffres n'ont pas de secret pour vous.</Text>
                </View>
              </ScaleButton>
            </Animated.View>

            <Animated.View style={[styles.cardWrapper, makeAnimStyle(picrossAnim)]}>
              <ScaleButton
                style={styles.card}
                onPress={() => handlePressCard('picross')}
              >
                <PicrossIllustration style={styles.illustration} />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>Picross</Text>
                  <Text style={styles.cardDescription}>Révélez l'image cachée grâce aux indices.</Text>
                </View>
              </ScaleButton>
            </Animated.View>
          </Animated.View>

          {/* 2. Level Selection List (Cross-fades on top) */}
          {selectedGame !== null && (
            <Animated.View 
              style={[styles.selectorContainer, selectorContainerStyle]}
              pointerEvents={selectedGame !== null ? 'auto' : 'none'}
            >
              <View style={styles.optionsContainer}>
                {currentLevels.map((lvl) => {
                  const isActive = selectedLevel === lvl.key;
                  return (
                    <ScaleButton
                      key={lvl.key}
                      style={[styles.levelOption, isActive && styles.levelOptionActive]}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setSelectedLevel(lvl.key);
                      }}
                    >
                      <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                        {isActive && <View style={styles.radioInner} />}
                      </View>
                      <View style={styles.levelTextContainer}>
                        <Text style={[styles.levelTitle, isActive && styles.levelTitleActive]}>
                          {lvl.title}
                        </Text>
                        <Text style={styles.levelDesc}>{lvl.desc}</Text>
                      </View>
                    </ScaleButton>
                  );
                })}
              </View>

              <ScaleButton
                style={styles.startButton}
                onPress={handleStartGame}
              >
                <Text style={styles.startButtonText}>Commencer la partie</Text>
              </ScaleButton>
            </Animated.View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.presets.hero,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    ...theme.typography.presets.headline,
    color: theme.colors.textSecondary,
  },
  selectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectionTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  selectionTitle: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  selectionSubtitle: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textSecondary,
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
  viewsContainer: {
    width: '100%',
    position: 'relative',
    minHeight: 320,
  },
  cardsContainer: {
    width: '100%',
    gap: 20,
  },
  cardWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    flexDirection: 'row',
    alignItems: 'center',
  },
  illustration: {
    marginRight: 16,
  },
  cardTitle: {
    ...theme.typography.presets.title2,
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardText: {
    flex: 1,
  },
  cardDescription: {
    ...theme.typography.presets.bodyNormal,
    color: theme.colors.textSecondary,
    flexShrink: 1,
  },
  // Selection Panel Styles
  selectorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  levelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    marginBottom: 12,
  },
  levelOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioOuterActive: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  levelTextContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  levelTitleActive: {
    color: theme.colors.primary,
  },
  levelDesc: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weight.regular,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
  },
});
