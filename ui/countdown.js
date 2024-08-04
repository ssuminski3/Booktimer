import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config'

//props selectedIndex and setSelectedIndex - state with choosed value

function AddThought() {
    const [active, setActive] = useState(false)
    const [thought, setThought] = useState("")
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const refThought = useRef()
    const refPage = useRef()

    const onPress = async () => {
        setActive(false)
        setPage("")
        setThought("")
        refThought.current.blur()
        refPage.current.blur()
        try {
            if (thought != "") {
                console.log(thought)
                setLoading(true)
                const docRef = await addDoc(collection(db, "thoughts"), {
                    thought: thought,
                    page: page
                })
                console.log("Added ")
            }
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        (loading)?<Text>loading...</Text>:
            <View className="m-10 p-3" style={{ flexDirection: 'row', borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderWidth: active ? 2 : 1 }}>
                <TextInput
                    ref={refThought}
                    onChange={(e) => { setThought(e.nativeEvent.text) }}
                    multiline
                    maxLength={60}
                    placeholder='Write your thought on book'
                    style={{ borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderBottomWidth: active ? 3 : 1 }}
                    onFocus={() => setActive(true)}
                    onSubmitEditing={() => setActive(false)} />
                <TextInput
                    ref={refPage}
                    value={page}
                    onChange={(e) => setPage(e.nativeEvent.text)}
                    maxLength={4}
                    placeholder='Page'
                    className="ml-1"
                    keyboardType='numeric'
                    style={{ borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderBottomWidth: active ? 3 : 1 }}
                    onFocus={() => setActive(true)}
                    onSubmitEditing={() => setActive(false)} />
                <TouchableOpacity className="bg-orange-500 w-1/5 m-1 ml-5 p-1 rounded-xl items-center justify-center" onPress={onPress}>
                    <Text className="text-white text-center">+</Text>
                </TouchableOpacity>
            </View>

    )
}

export default function Countdown(props) {

    const [isPlaying, setIsPlaying] = useState(true)

    return (
        <View className="justify-center items-center h-full bg-slate-200">
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={props.time * 60}
                colors={['#f97316']}
                onComplete={props.endRead}
            >
                {({ remainingTime }) => (
                    <Text className="text-orange-500 text-2xl">
                        {(Math.floor(remainingTime / 60) >= 10) ? Math.floor(remainingTime / 60) : "0" + Math.floor(remainingTime / 60)} : {(remainingTime % 60 >= 10) ? remainingTime % 60 : "0" + remainingTime % 60}
                    </Text>
                )}
            </CountdownCircleTimer>
            <AddThought />
            <View className="w-1/2 mt-1.5" style={{ flexDirection: 'row' }}>
                <TouchableOpacity className="bg-orange-500 w-1/2 m-1 p-1" onPress={() => setIsPlaying(!isPlaying)}>
                    <Text className="text-white text-center">{isPlaying ? "Pause" : "Start"}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-orange-500 w-1/2 m-1 p-1" onPress={props.endRead}>
                    <Text className="text-white text-center">Stop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}