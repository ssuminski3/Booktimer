import React, { useState, useRef } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config'

function FinishedPage(props) {
    const [active, setActive] = useState(false)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const refPage = useRef()

    const onPress = async () => {
        setActive(false)
        setPage("")
        refPage.current.blur()
        try {
            if (page != "") {
                setLoading(true)
                const docRef = await addDoc(collection(db, "readingSession"), {
                    page: page, time: props.time, date: Date()
                })
                console.log("Added ")
            }
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setLoading(false)
            router.replace("./bookslist")
        }
    }
    return (
        (loading) ? <Text>loading...</Text> :
            <View className="m-10 p-3" style={{ borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderWidth: active ? 2 : 1 }}>
                <TextInput
                    ref={refPage}
                    value={page}
                    onChange={(e) => setPage(e.nativeEvent.text)}
                    maxLength={4}
                    placeholder='Page that you finished on'
                    className="ml-1"
                    keyboardType='numeric'
                    style={{ borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderBottomWidth: active ? 3 : 1 }}
                    onFocus={() => setActive(true)}
                    onSubmitEditing={() => setActive(false)} />
                <TouchableOpacity className="bg-orange-500 m-5 rounded-xl items-center justify-center" onPress={onPress}>
                    <Text className="text-white text-center">Finish</Text>
                </TouchableOpacity>
            </View>

    )
}

export default function Finish(props) {

    return (
        <View className="bg-slate-200 h-full justify-center">

            <TouchableOpacity className="items-center" onPress={props.oneMoreMoment}>
                <Text className="text-orange-500 text-center">Give me 5 minutes more</Text>
            </TouchableOpacity>

            <FinishedPage time={props.time} goHome={props.goHome} />

        </View >
    );
}