import { ActivityIndicator, TextInput, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { firebaseAuth } from '../firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const auth = firebaseAuth


    const signIn = async () => {
        setLoading(true)
        try {
            if (email === "" || password === "") {
                setError("Email and password can't be empty.")
            }
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("Wow: "+response.error)
        }
        catch (e) {
            setError("Wrong email or password")
        }
        finally {
            setLoading(false)
            router.replace('./')
        }
    }
    const signUp = async () => {
        setLoading(true)
        try {
            if (email === "" || password === "") {
                setError("Email and password can't be empty.")
                return
            }
            const response = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <View className={`flex-1 justify-center items-center ${global.colorMode.backgroundColors[global.colorMode.darkMode]}`}>
            <TextInput className={`${global.colorMode.secondaryColors[global.colorMode.darkMode]} w-2/3 border-blue-950 divide-solid m-2`} placeholder='email' autoCapitalize='none' onChangeText={(e) => setEmail(e)}></TextInput>
            <TextInput secureTextEntry={true} className={`${global.colorMode.secondaryColors[global.colorMode.darkMode]} w-2/3 m-2`} placeholder='password' autoCapitalize='false' onChangeText={(e) => setPassword(e)}></TextInput>
            <Text className={`text-red-500 m-2 ${global.colorMode.textColors[global.colorMode.darkMode]}`}>{error}</Text>
            {
                loading ? <ActivityIndicator size={'large'} color={"#f97316"} />
                    : <>
                        <TouchableOpacity className="bg-orange-500 w-1/2 m-1 p-1" onPress={signIn}>
                            <Text className={`text-white text-center ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-orange-500 w-1/2 m-1 p-1" onPress={signUp}>
                            <Text className={`text-white text-center ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Craete account</Text>
                        </TouchableOpacity>
                    </>
            }
        </View>
    )
}