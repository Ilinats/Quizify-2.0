import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MyStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <Link href="/testDisplay" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        color='blue'
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
        }} >
        <Stack.Screen name="folderScreen"/>
        </Stack>
    );
}