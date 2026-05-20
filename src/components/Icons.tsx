import React from 'react';
import Svg, { Path, Circle, Rect, Line, SvgProps } from 'react-native-svg';
import { theme } from '../theme';

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Chevron Gauche (Retour)
export const ChevronLeftIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

// Paramètres (Engrenage)
export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

// Ampoule (Indices / Astuces)
export const LightbulbIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5" />
    <Line x1="9" y1="18" x2="15" y2="18" />
    <Line x1="10" y1="22" x2="14" y2="22" />
  </Svg>
);

// Corbeille / Gomme (Effacer)
export const TrashIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M3 6h18" />
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <Line x1="10" y1="11" x2="10" y2="17" />
    <Line x1="14" y1="11" x2="14" y2="17" />
  </Svg>
);

// Crayon (Brouillon)
export const PencilIcon: React.FC<IconProps> = ({
  size = 20,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </Svg>
);

// Croix (Outil Picross)
export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

// Remplir / Coche (Outil Picross / Succès)
export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

// Recommencer (Refresh)
export const RefreshIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M23 4v6h-6" />
    <Path d="M1 20v-6h6" />
    <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <Path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Svg>
);

// --- ILLUSTRATIONS DE CARTES (MENU) ---

// Illustration pour la carte Sudoku (Grille 3x3 stylisée)
export const SudokuIllustration: React.FC<IconProps> = ({
  size = 56,
  color = theme.colors.primary,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 56 56" fill="none" {...props}>
    <Rect width="56" height="56" rx="16" fill={theme.colors.primaryLight} />
    {/* Contours de grille */}
    <Rect x="10" y="10" width="36" height="36" rx="6" stroke={color} strokeWidth="1.5" />
    {/* Lignes intérieures */}
    <Line x1="22" y1="10" x2="22" y2="46" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <Line x1="34" y1="10" x2="34" y2="46" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <Line x1="10" y1="22" x2="46" y2="22" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <Line x1="10" y1="34" x2="46" y2="34" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    {/* Chiffres symboliques */}
    <Path
      d="M16 18h2v-4M26 14h3v2l-3 4h3M39 14h2v6m-2-3h3"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <Path
      d="M15 28h3v3M26 26h3v3M38 27h3v2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </Svg>
);

// Illustration pour la carte Picross (Pixel Art stylisé)
export const PicrossIllustration: React.FC<IconProps> = ({
  size = 56,
  color = theme.colors.picrossFilled,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 56 56" fill="none" {...props}>
    <Rect width="56" height="56" rx="16" fill={theme.colors.border} />
    {/* Contours de grille 4x4 */}
    <Rect x="12" y="12" width="32" height="32" rx="4" stroke={color} strokeWidth="1.5" />
    {/* Grille intérieure */}
    <Line x1="20" y1="12" x2="20" y2="44" stroke={color} strokeWidth="0.5" opacity="0.4" />
    <Line x1="28" y1="12" x2="28" y2="44" stroke={color} strokeWidth="1" />
    <Line x1="36" y1="12" x2="36" y2="44" stroke={color} strokeWidth="0.5" opacity="0.4" />
    <Line x1="12" y1="20" x2="44" y2="20" stroke={color} strokeWidth="0.5" opacity="0.4" />
    <Line x1="12" y1="28" x2="44" y2="28" stroke={color} strokeWidth="1" />
    <Line x1="12" y1="36" x2="44" y2="36" stroke={color} strokeWidth="0.5" opacity="0.4" />
    {/* Cases Picross Remplies */}
    <Rect x="20" y="12" width="8" height="8" fill={color} opacity="0.9" />
    <Rect x="12" y="20" width="8" height="8" fill={color} opacity="0.9" />
    <Rect x="20" y="20" width="8" height="8" fill={color} opacity="0.9" />
    <Rect x="28" y="28" width="8" height="8" fill={color} opacity="0.9" />
    <Rect x="36" y="28" width="8" height="8" fill={color} opacity="0.9" />
    <Rect x="28" y="36" width="8" height="8" fill={color} opacity="0.9" />
    {/* Petites croix */}
    <Path
      d="M14 14l4 4m0-4l-4 4 M30 14l4 4m0-4l-4 4"
      stroke={theme.colors.textSecondary}
      strokeWidth="1"
      opacity="0.8"
    />
  </Svg>
);

// Trophée de la victoire
export const TrophyIcon: React.FC<IconProps> = ({
  size = 24,
  color = theme.colors.text,
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <Path d="M4 22h16" />
    <Path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34" />
    <Path d="M12 2a7 7 0 0 1 7 7c0 3.18-2.12 5.86-5 6.71V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v13.71c-2.88-.85-5-3.53-5-6.71a7 7 0 0 1 7-7z" />
  </Svg>
);
