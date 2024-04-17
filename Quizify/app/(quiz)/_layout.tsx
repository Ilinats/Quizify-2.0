import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MyStack() {
    return (
        <Stack>
            <Stack.Screen name="testDisplay" options={{headerTitle: 'Quiz'}} />
        </Stack>
    );
}