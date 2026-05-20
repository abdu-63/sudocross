import { Platform } from 'react-native';

const systemFontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

export const typography = {
  family: {
    regular: systemFontFamily,
    medium: systemFontFamily,
    semibold: systemFontFamily,
    bold: systemFontFamily,
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  letterSpacing: {
    tightest: -1.2,
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    widest: 0.8,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  // Presets mapping sizes, weights, heights, and tracking for standard layout components
  presets: {
    hero: {
      fontFamily: systemFontFamily,
      fontSize: 40,
      fontWeight: '700' as const,
      lineHeight: 48,
      letterSpacing: -1.2,
    },
    title1: {
      fontFamily: systemFontFamily,
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
      letterSpacing: -0.8,
    },
    title2: {
      fontFamily: systemFontFamily,
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
      letterSpacing: -0.6,
    },
    headline: {
      fontFamily: systemFontFamily,
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: -0.2,
    },
    bodyLarge: {
      fontFamily: systemFontFamily,
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodyLargeMedium: {
      fontFamily: systemFontFamily,
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodyLargeBold: {
      fontFamily: systemFontFamily,
      fontSize: 16,
      fontWeight: '700' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodyNormal: {
      fontFamily: systemFontFamily,
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0,
    },
    bodyNormalMedium: {
      fontFamily: systemFontFamily,
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: systemFontFamily,
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      letterSpacing: 0.1,
    },
    captionMedium: {
      fontFamily: systemFontFamily,
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.1,
    },
    button: {
      fontFamily: systemFontFamily,
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
      letterSpacing: 0.2,
    },
    cellSudoku: {
      fontFamily: systemFontFamily,
      fontSize: 24,
      lineHeight: 30,
      letterSpacing: 0,
    },
    cellSudokuNotes: {
      fontFamily: systemFontFamily,
      fontSize: 9,
      lineHeight: 11,
      letterSpacing: 0,
    }
  }
};
export type TypographyPreset = keyof typeof typography.presets;

