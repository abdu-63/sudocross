import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { usePicrossStore } from '../../store/usePicrossStore';
import * as Haptics from 'expo-haptics';
import { theme } from '../../theme';
import { CheckIcon, CloseIcon } from '../Icons';
import { ScaleButton } from '../ScaleButton';

export const PicrossControls: React.FC = () => {
  const { currentTool, setTool } = usePicrossStore();

  const handleSelectTool = (tool: 'fill' | 'cross') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTool(tool);
  };

  return (
    <View style={styles.container}>
      <ScaleButton
        style={[styles.button, currentTool === 'fill' && styles.buttonActiveFill]}
        onPress={() => handleSelectTool('fill')}
      >
        <View style={styles.buttonContent}>
          <CheckIcon 
            size={18} 
            color={currentTool === 'fill' ? theme.colors.surface : theme.colors.text} 
          />
          <Text style={[styles.text, currentTool === 'fill' && styles.textActive]}>Remplir</Text>
        </View>
      </ScaleButton>

      <ScaleButton
        style={[styles.button, currentTool === 'cross' && styles.buttonActiveCross]}
        onPress={() => handleSelectTool('cross')}
      >
        <View style={styles.buttonContent}>
          <CloseIcon 
            size={18} 
            color={currentTool === 'cross' ? theme.colors.surface : theme.colors.text} 
          />
          <Text style={[styles.text, currentTool === 'cross' && styles.textActive]}>Croix</Text>
        </View>
      </ScaleButton>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  button: {
    flex: 1,
    maxWidth: 160,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceGlass,
    borderWidth: 1.5,
    borderColor: theme.colors.borderGlass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonActiveFill: {
    backgroundColor: theme.colors.picrossFilled,
    borderColor: theme.colors.picrossFilled,
  },
  buttonActiveCross: {
    backgroundColor: theme.colors.picrossCrossed,
    borderColor: theme.colors.picrossCrossed,
  },
  text: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },
  textActive: {
    color: theme.colors.surface,
  },
});
