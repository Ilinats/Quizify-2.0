import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { globalVariable } from '@/globals';
import { useNavigation } from 'expo-router';
import Button from './Button';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { globalVariable2 } from '@/try';

const QuizComponent = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [color, setColor] = useState(false);
    const [pressedIndex, setPressedIndex] = useState(-1); // to highlight the correct answer after pressing
    const [answerLocked, setAnswerLocked] = useState(false); // to prevent answering while animation is ongoing
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    var allPressed1: number[] = [];
    var [allPressed, setAllPressed] = useState(allPressed1);
    const { user } = useAuth();

    const resetQuiz = () => {
        setScore(0);
        setQuestionIndex(0);
        setAllPressed([]);
    }

    const handlePress = async () => {
        resetQuiz();
        setLoading(false);
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const filePath = `${user.id}/${formattedDate}/${globalVariable2.Time}/${'answer'}.${'txt'}`;
        const contentType = 'text/plain'

        const { data, error } = await supabase.storage.from('files').upload(filePath, allPressed.toString(), { contentType });
        if (error) {
            console.error('Error uploading file:', error.message);
        } else {
            console.log('File uploaded successfully:', data);
        }
        navigation.navigate('index');
    }

    const checkAnswer = (index: number) => {
        if (answerLocked) 
            return;

        setPressedIndex(index);
        console.log(index);
        allPressed.push(index);
        console.log(allPressed);
        setColor(true);

        const isCorrect = GPTOutput().questions[questionIndex].answers[index].is_correct;
        if (isCorrect) {
            setScore(score + 1);
            setTimeout(() => {
                setQuestionIndex(questionIndex + 1);
            }, 1000);
        } else {
            setTimeout(() => {
                setQuestionIndex(questionIndex + 1);
            }, 1000);
        }
        setAnswerLocked(true);
        setTimeout(() => {
            setColor(false);
            setAnswerLocked(false);
            setPressedIndex(-1);
            allPressed = [];
        }, 1000);
    }

    const GPTOutput = () => {
        if (typeof globalVariable.GPTOutput === 'string')
            globalVariable.GPTOutput = JSON.parse(globalVariable.GPTOutput);
        return globalVariable.GPTOutput;
    };

    const renderQuiz = () => {

        if (loading && GPTOutput() && GPTOutput().questions && GPTOutput().questions.length > 1) {
            if (questionIndex < GPTOutput().questions.length) {
                return (
                    <View>
                        <Text style={styles.question}>{GPTOutput().questions[questionIndex].question}</Text>
                        <Pressable
                            onPress={() => checkAnswer(0)}
                            style={[
                                styles.button,
                                color && GPTOutput().questions[questionIndex].answers[0].is_correct && styles.correctAnswer,
                                color && !GPTOutput().questions[questionIndex].answers[0].is_correct && pressedIndex === 0 && styles.wrongAnswer,
                            ]}
                        >
                            <Text style={styles.title}>{GPTOutput().questions[questionIndex].answers[0].answer}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => checkAnswer(1)}
                            style={[
                                styles.button,
                                color && GPTOutput().questions[questionIndex].answers[1].is_correct && styles.correctAnswer,
                                color && !GPTOutput().questions[questionIndex].answers[1].is_correct && pressedIndex === 1 && styles.wrongAnswer,
                            ]}
                        >
                            <Text style={styles.title}>{GPTOutput().questions[questionIndex].answers[1].answer}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => checkAnswer(2)}
                            style={[
                                styles.button,
                                color && GPTOutput().questions[questionIndex].answers[2].is_correct && styles.correctAnswer,
                                color && !GPTOutput().questions[questionIndex].answers[2].is_correct && pressedIndex === 2 && styles.wrongAnswer,
                            ]}
                        >
                            <Text style={styles.title} >{GPTOutput().questions[questionIndex].answers[2].answer}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => checkAnswer(3)}
                            style={[
                                styles.button,
                                color && GPTOutput().questions[questionIndex].answers[3].is_correct && styles.correctAnswer,
                                color && !GPTOutput().questions[questionIndex].answers[3].is_correct && pressedIndex === 3 && styles.wrongAnswer,
                            ]}
                        >
                            <Text style={styles.title}>{GPTOutput().questions[questionIndex].answers[3].answer}</Text>
                        </Pressable>
                    </View>
                );
            } else {
                return (
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.score}>Quiz Over</Text>
                        <Text style={styles.score}>Your Score: {score}</Text>
                        <View style={{ marginTop: 90, alignItems: 'center' }}>
                            <Button onPress={handlePress} text='Go Back' />
                        </View>

                    </SafeAreaView>
                );
            }
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
    };

    return (
        <View>
            {renderQuiz()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 465,
        display: "flex",
        alignItems: "center",
        padding: 205,
        // justifyContent: "space-evenly",
        backgroundColor: "#fdf1bc",
        height: "100%",
    },
    button: {
        backgroundColor: '#fc7474',
        padding: 15,
        textAlign: "center",
        borderRadius: 100,
        marginVertical: 10,
    },
    score: {
        padding: 0,
        textAlign: "center",
        borderRadius: 100,
        marginVertical: 10,
    },
    correctAnswer: {
        backgroundColor: 'green',
    },
    wrongAnswer: {
        backgroundColor: 'red',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
    }
});

export default QuizComponent;