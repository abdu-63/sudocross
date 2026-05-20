import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { SudokuGame } from './src/screens/SudokuGame';
import { PicrossGame } from './src/screens/PicrossGame';
import { MeshBackground } from './src/components/MeshBackground';
import { useSudokuStore } from './src/store/useSudokuStore';
import { usePicrossStore } from './src/store/usePicrossStore';
import { useAppStore } from './src/store/useAppStore';

export default function App() {
  const { activeGame, setActiveGame } = useAppStore();

  const handleSelectGame = (
    game: 'sudoku' | 'picross',
    config?: { difficulty?: 'easy' | 'medium' | 'hard'; size?: 5 | 10 | 15 }
  ) => {
    if (game === 'sudoku') {
      const difficulty = config?.difficulty || 'medium';
      useSudokuStore.getState().initGame(difficulty);
    } else {
      const size = config?.size || 10;
      usePicrossStore.getState().initGame(size);
    }
    setActiveGame(game);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MeshBackground />
      {activeGame === null ? (
        <HomeScreen onSelectGame={handleSelectGame} />
      ) : activeGame === 'sudoku' ? (
        <SudokuGame onBack={() => setActiveGame(null)} />
      ) : (
        <PicrossGame onBack={() => setActiveGame(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

