import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const GameOver = ({ roundsNumber, restartGame }) => {
    return (
        <View style={styles.screen}>
            <Text>The game is over!</Text>
            <Text>Number of rows : {roundsNumber}</Text>
            <Button title="PLAY AGAIN!" onPress={() => { restartGame() }} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    }
})

export default GameOver;