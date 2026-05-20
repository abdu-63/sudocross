import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { theme } from '../theme';
import { TrophyIcon } from './Icons';
import { ScaleButton } from './ScaleButton';

const { width, height } = Dimensions.get('window');

interface VictoryOverlayProps {
  isVisible: boolean;
  onNewGame: () => void;
  title?: string;
  subtitle?: string;
}

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({
  isVisible,
  onNewGame,
  title = "Félicitations !",
  subtitle = "Grille résolue avec succès !"
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Static list of confetti configurations
  const confettiCount = 30;
  const particles = useRef(
    Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      color: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'][i % 6],
      left: Math.random() * width,
      size: Math.random() * 8 + 6,
      delay: Math.random() * 800,
      animY: new Animated.Value(-20),
      animX: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in and scale card
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Pulsing effect behind trophy
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Confetti animation loops
      particles.forEach((p) => {
        p.animY.setValue(-20);
        p.animX.setValue(0);
        Animated.loop(
          Animated.sequence([
            Animated.delay(p.delay),
            Animated.parallel([
              Animated.timing(p.animY, {
                toValue: height * 0.85,
                duration: Math.random() * 1500 + 2500,
                useNativeDriver: true,
              }),
              Animated.timing(p.animX, {
                toValue: (Math.random() - 0.5) * 160,
                duration: Math.random() * 1500 + 2500,
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      });
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.85);
      pulseAnim.setValue(1);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} pointerEvents="box-none">
      {/* Absolute floating confetti particles */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p) => (
          <Animated.View
            key={p.id}
            style={[
              styles.particle,
              {
                left: p.left,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                borderRadius: p.size / 2,
                transform: [
                  { translateY: p.animY },
                  { translateX: p.animX }
                ]
              }
            ]}
          />
        ))}
      </View>

      {/* Victory Card */}
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.trophyContainer}>
          <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]} />
          <TrophyIcon size={56} color="#F59E0B" />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <ScaleButton style={styles.button} onPress={onNewGame}>
          <Text style={styles.buttonText}>Nouvelle Partie</Text>
        </ScaleButton>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Dark glass overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  card: {
    width: '85%',
    maxWidth: 320,
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
  },
  trophyContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
  },
  particle: {
    position: 'absolute',
    top: 0,
  }
});
