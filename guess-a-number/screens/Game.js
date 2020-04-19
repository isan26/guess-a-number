import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

function generateRandomNumberBetween(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor((Math.random() * (max - min))) + min;

    return (randomNumber == exclude) ? generateRandomNumberBetween(min, max, exclude) : randomNumber;
}

const Game = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomNumberBetween(1, 99, props.userChoise));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const [rounds, setRounds] = useState(0);

    const { userChoise, onGameOver } = props;

    useEffect(() => { //Component did mount
        if (currentGuess === userChoise) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoise, onGameOver]);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < props.userChoise) ||
            (direction === 'greater' && currentGuess > props.userChoise)
        ) {
            Alert.alert('Don\'t lie!', "THis is wrong!!", [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(rounds => rounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                    </View>
                    <View>
                        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '80%'
    }
})

export default Game;