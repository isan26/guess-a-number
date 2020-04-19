import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/Game';
import GameOver from './screens/GameOver';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setDataLoaded(true); console.log('FINISHED') }}
        onError={(e) => console.log(e)} />
    )
  }

  function restartGame() {
    setGuessRound(0);
    setUserNumber(null);
  }

  function startGameHandler(selectedNumber) {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  }

  function gameOverHandler(numOfRounds) {
    setGuessRound(numOfRounds);
  }

  let content = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRound > 0) {
    content = <GameOver roundsNumber={guessRound} restartGame={restartGame} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" styles={styles.screen} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
