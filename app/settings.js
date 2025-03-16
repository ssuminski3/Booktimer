import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Appearance } from 'react-native';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase.config';
import { router } from 'expo-router';

export default function Settings() {
    const [isEnabled, setIsEnabled] = useState(global.colorMode.darkMode);
    
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        global.colorMode.darkMode = !global.colorMode.darkMode
        Appearance.setColorScheme((global.colorMode.darkMode ? 'dark' : 'light'))
    };

    const sOut = async () => {
        try{
            await signOut(firebaseAuth)
            router.replace("./")
        }
        catch(e){
            console.error("Błąd")
        }
    } 

    return (
        <View className={`w-full flex-1 ${global.colorMode.backgroundColors[global.colorMode.darkMode]}`}>
            <View className="flex-1 w-full m-3">
                <View className="flex-row border-b border-gray-400 w-full pl-5 pr-5 justify-between">
                    <Text className={`m-3 text-lg ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Dark mode</Text>
                    <Switch
                        trackColor={{ false: '#9ca3af', true: '#f97316' }}
                        onValueChange={toggleSwitch}
                        value={isEnabled}

                    />
                </View>
                <TouchableOpacity className="flex-row border-b border-gray-400 w-full pl-5 pr-5 justify-between" onPress={sOut}>
                    <Text className={`m-3 text-lg text-red-600`}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}