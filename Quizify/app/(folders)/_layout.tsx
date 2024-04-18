import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MyStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <Link href="/redirect" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <AntDesign
                        name="areachart"
                        size={25}
                        color='#fc7474'
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
        }} >
        <Stack.Screen name="folderScreen" options={{headerTitle: 'Library'}} />
        </Stack>
    );
}