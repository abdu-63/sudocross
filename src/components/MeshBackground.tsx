import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Rect, Circle, Defs, Filter, LinearGradient, Stop, G, FeGaussianBlur } from 'react-native-svg';
import { theme } from '../theme';

export const MeshBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          {/* Base Background Gradient */}
          <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={theme.colors.gradientStart} stopOpacity={1} />
            <Stop offset="100%" stopColor={theme.colors.gradientEnd} stopOpacity={1} />
          </LinearGradient>

          {/* High-quality Gaussian Blur Filter for blending the mesh blobs */}
          <Filter id="meshBlur" x="-50%" y="-50%" width="200%" height="200%">
            <FeGaussianBlur stdDeviation={width * 0.22} />
          </Filter>
        </Defs>

        {/* 1. Base Gradient Layer */}
        <Rect width="100%" height="100%" fill="url(#bgGrad)" />

        {/* 2. Blurred Mesh Blobs Layer */}
        <G filter="url(#meshBlur)">
          {/* Top Left - Indigo Blob */}
          <Circle
            cx={width * 0.15}
            cy={height * 0.15}
            r={width * 0.55}
            fill={theme.colors.meshColors.bubble1}
          />
          
          {/* Bottom Right - Mint/Emerald Blob */}
          <Circle
            cx={width * 0.85}
            cy={height * 0.85}
            r={width * 0.65}
            fill={theme.colors.meshColors.bubble2}
          />

          {/* Top Right - Soft Pink Blob */}
          <Circle
            cx={width * 0.80}
            cy={height * 0.25}
            r={width * 0.50}
            fill={theme.colors.meshColors.bubble3}
          />

          {/* Bottom Left / Center Left - Soft Amber Blob */}
          <Circle
            cx={width * 0.10}
            cy={height * 0.60}
            r={width * 0.45}
            fill={theme.colors.meshColors.bubble4}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1, // Keep behind all interactive screens
    backgroundColor: '#F8FAFC',
  },
});
