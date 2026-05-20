export const colors = {
  // Base Colors
  background: '#F8FAFC', // Slate 50 (Fallback soft background)
  surface: '#FFFFFF',
  surfaceGlass: 'rgba(255, 255, 255, 0.70)', // Glassmorphic card surface
  text: '#0F172A', // Slate 900 (Elegant deep dark blue-grey)
  textSecondary: '#64748B', // Slate 500 (Subtle grey-blue for secondary text)
  border: '#E2E8F0', // Slate 200 (Clean, thin border)
  borderGlass: 'rgba(255, 255, 255, 0.50)', // Subtitle border for glass cards
  
  // Accents (curated vibrant colors)
  primary: '#4F46E5', // Indigo 600 (High-end blue-indigo)
  primaryLight: '#EEF2FF', // Indigo 50
  primaryPressed: '#4338CA', // Indigo 700
  success: '#10B981', // Emerald 500 (Vibrant, soft green)
  successLight: '#ECFDF5', // Emerald 50
  error: '#F43F5E', // Rose 500 (Premium deep pink-red)
  errorLight: '#FFF1F2', // Rose 50
  warning: '#F59E0B', // Amber 500 (Soft orange-yellow)
  warningLight: '#FEF3C7', // Amber 50

  // Picross specific
  picrossFilled: '#1E293B', // Slate 800 (Rich slate black)
  picrossCrossed: '#94A3B8', // Slate 400 (Subtle slate grey)
  picrossHighlight: '#F1F5F9', // Slate 100

  // Sudoku specific
  sudokuGiven: '#0F172A', // Slate 900
  sudokuInput: '#4F46E5', // Indigo 600
  sudokuNotes: '#64748B', // Slate 500
  sudokuHighlight: 'rgba(79, 70, 229, 0.08)', // Soft Indigo background for selection
  sudokuHighlightSame: 'rgba(79, 70, 229, 0.03)', // Extremely soft tint for same-row/col cells
  sudokuCellBorder: '#E2E8F0', // Slate 200
  sudokuBlockBorder: '#475569', // Slate 600 (Defined boundaries for 3x3 blocks)

  // Mesh Gradient Background Colors (vibrant but highly pastel/subtle when blurred)
  gradientStart: '#F1F5F9', // Light Slate
  gradientEnd: '#EEF2FF', // Light Indigo
  meshColors: {
    bubble1: 'rgba(129, 140, 248, 0.15)', // Indigo
    bubble2: 'rgba(16, 185, 129, 0.10)',  // Emerald
    bubble3: 'rgba(236, 72, 153, 0.12)',  // Pink
    bubble4: 'rgba(245, 158, 11, 0.08)',  // Amber
  }
};

