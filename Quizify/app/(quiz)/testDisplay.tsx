import { Text, FlatList, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Folder } from '../folderIndex';
import base64ToArrayBuffer from 'base64-js';
import { Buffer } from 'buffer';

export default function TestDisplay() {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [quiz, setQuiz] = useState<any>(null);
    const [userAnswers, setUserAnswers] = useState<any>(null);

    useEffect(() => {
        if (!user)
            return;
        loadImages();
    }, [user]);

    useEffect(() => {
        if (quiz && userAnswers) {
            setLoading(false);
        }
    }, [quiz, userAnswers]);


    const loadImages = async () => {
        console.log()
        const path = `${user?.id}/${Folder.FolderName}/${Folder.QuizName}`;
        const { data, error } = await supabase.storage.from('files').list(path);

        if (!data || error)
            return;

        for (let i = 0; i < data.length; i++) {
            supabase.storage
                .from('files')
                .download(`${path}/${data[i].name}`)
                .then(({ data: extractedData }) => {

                    const reader = new FileReader();
                    reader.onload = function () {
                        const result = reader.result;
                        if (data[i].metadata.mimetype === 'text/plain;charset=UTF-8') {
                            const parsedResult = JSON.parse(result); // Parse the JSON string
                            setQuiz(parsedResult);
                        } else if (data[i].metadata.mimetype === 'text/plain') {
                            setUserAnswers(typeof result === 'string' ? result.replaceAll(',', '') : result);
                        }
                    };
                    reader.readAsText(extractedData!);
                });
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    {quiz.questions.map((data: any, questionIndex: any) => (
                        <View style={styles.questionContainer} key={questionIndex}>
                            <View style={styles.bubble}>
                                <Text style={styles.questionText}>{data.question}</Text>
                                {data.answers.map((answer: any, answerIndex: number) => {
                                    const userAnswerIndex = parseInt(userAnswers[questionIndex]);
                                    const isUserSelected = userAnswerIndex === answerIndex;
                                    const isCorrect = answer.is_correct;

                                    return (
                                        <Text
                                            key={answerIndex}
                                            style={[
                                                styles.answerText,
                                                isCorrect ? styles.correctBubble : (isUserSelected ? styles.wrongBubble : null),
                                            ]}
                                        >
                                            {answer.answer}
                                        </Text>
                                    );
                                })}
                            </View>
                        </View>
                    ))}

                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "#fdf1bc",
        paddingTop: 10,
    },
    questionContainer: {
        marginBottom: 10,
        width: '100%',
    },
    bubble: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    correctBubble: {
        color: 'green',
    },
    wrongBubble: {
        color: 'red',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    answerText: {
        fontSize: 18,
        marginBottom: 5,
    },
});