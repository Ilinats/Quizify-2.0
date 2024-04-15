import { useState} from 'react'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Stack, Link } from 'expo-router'
import {globalVariable} from '../../try'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [loading, setLoading] = useState(false)

    const onSignInPress = () => {
        globalVariable.Session = true;
    }

    const onSignUpPress = () => {
            
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
        <Image style={styles.curve} source={require('../../assets/images/curve.png')} />
        <Image style={styles.down1} source={require('../../assets/images/down1.png')} />
        <Image style={styles.up1} source={require('../../assets/images/up1.png')} />
        <Text style={styles.header}>Welcome</Text>

        <TextInput
            autoCapitalize="none"
            placeholder="john@doe.com"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
        />
        <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword} 
            secureTextEntry
            style={styles.inputField}
        />

        <Link href={'../(tabs)'} style={styles.button} asChild>
            <TouchableOpacity onPress={onSignUpPress}>
                <Text style={{ color: '#fff', textAlign: 'center'}}>Create Account</Text>
            </TouchableOpacity>
        </Link>
        <Link href={'/(auth)/sign-in'} style={styles.button} asChild>
            <TouchableOpacity onPress={onSignInPress}>
                <Text style={{ color: '#fff' }}>Sign in</Text>
            </TouchableOpacity>
        </Link>
        </View>
    )
    }

    const styles = StyleSheet.create({
    curve: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        opacity: 1,
        resizeMode:"cover"
    },
    up1: {
        width: 170,
        height: 170,
        position: 'absolute',
        opacity: 1,
        resizeMode:"contain"
    },
    down1: {
        width: 130,
        height: 130,
        bottom: -10,
        right: 0,
        position: 'absolute',
        opacity: 1,
        resizeMode:"contain"
    },
    container: {
        flex: 1,
        paddingTop: 190,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 50,
        color: '#ff6262',
    },
    inputField: {
        marginVertical: 4,
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        borderColor: '#ff6262',
        borderRadius: 10,
        padding: 10,
        color: '#696969',
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 20,
        marginVertical: -10,
        marginHorizontal: 100,
        alignItems: 'center',
        backgroundColor: '#ff6262',
        padding: 15,
        borderRadius: 1000,
    },
})



export default Login;