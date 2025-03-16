import React from 'react';
import WheelPicker from 'react-native-wheely';
import { View, Text, TouchableOpacity } from 'react-native';

//props selectedIndex and setSelectedIndex - state with choosed value

export default function TimePicker(props) {
    return (
        <View className={`justify-center items-center ${global.colorMode.backgroundColors[global.colorMode.darkMode]} h-full`}>
            <Text className={`text-gray-600 text-xl text-center ${global.colorMode.textColors[global.colorMode.darkMode]}`}>How long do you want to read in this session? (in minutes)</Text>
            <WheelPicker
                selectedIndex={props.selectedIndex}
                options={Array.from({ length: 121 }, (_, i) => i)}
                onChange={(index) => props.setSelectedIndex(index)}
                itemTextStyle={{ color: "#f97316", fontSize: 28 }}
                selectedIndicatorStyle={{ backgroundColor: "#e2e8f0", borderStyle: "solid", borderColor: "#000", borderBottomWidth: 1, borderTopWidth: 1 }}
                containerStyle={{ width: "50%" }}
                itemHeight={80}
            />
            <TouchableOpacity className="bg-orange-500 w-1/2 m-1 p-1 rounded-lg" onPress={props.goRead}>
                <Text className={`text-white text-center ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Start reading</Text>
            </TouchableOpacity>
        </View>
    );
}