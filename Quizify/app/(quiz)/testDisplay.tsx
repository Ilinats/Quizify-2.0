import { Text, FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
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
    var answerIndex = -2; // da se opravi

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
                        if(data[i].metadata.mimetype === 'text/plain;charset=UTF-8') {
                            const parsedResult = JSON.parse(result); // Parse the JSON string
                            setQuiz(parsedResult);
                        } else if(data[i].metadata.mimetype === 'text/plain') {
                            setUserAnswers(result);
                        }
                    };
                    reader.readAsText(extractedData!);
                });
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const userAnswerIndex = answerIndex;
        answerIndex += 2; // Assuming each question has two answers
        return (
            <View style={styles.questionContainer}>
                <View style={styles.bubble}>
                    <Text style={styles.questionText}>{item.question}</Text>
                    {item.answers.map((answer: any, index: number) => (
                        <Text key={index} style={[styles.answerText, answer.is_correct ? styles.correctBubble : (userAnswers[userAnswerIndex] === index ? styles.wrongBubble : null)]}>
                            {answer.answer}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList 
                    data={quiz.questions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        paddingTop: 10,
        backgroundColor: "#fdf1bc",
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    answerText: {
        fontSize: 16,
        marginBottom: 5,
    },
});