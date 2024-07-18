import React from 'react';
import { Image, Text, View } from 'react-native';

export default function BookCard(props) {
    return (
        <View className = "bg-slate-100 w-2/5 h-full p-2 m-5 shadow-2xl" >
            <Image source={require('../assets/default.png')} resizeMode="contain" className="w-full h-3/5"/>
            <Text className="m-2">{props.title}</Text>
        </View >
  );
}