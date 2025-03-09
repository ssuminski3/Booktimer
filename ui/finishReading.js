import React, { useState, useRef } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config'

function FinishedPage(props) {
    const [active, setActive] = useState(false)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const refPage = useRef()

    const onPress = async () => {
        try {
            if (page === "") {
                // Handle empty input (e.g., show an error message)
                return;
            }
            const pageNumber = parseInt(page);
            if (isNaN(pageNumber)) {
                // Handle invalid input (e.g., show an error message)
                return;
            }
    
            setLoading(true);
    
            const docRef = await addDoc(collection(db, "readingSession"), {
                page: pageNumber,
                time: props.time,
                date: Date(),
                bookId: props.id,
            });
            try{
                //db.collection('books').doc(props.id).update({readedPages: pageNumber})
                console.log("SER", pageNumber, props.id)
                const bookRef = doc(db, 'books', props.id);
                // Update readedPages (assuming it's a number)
                await updateDoc(bookRef, { 
                    readedPages: pageNumber 
                });
            }
            catch(e){
                console.log("Problem z updatowaniem", e)
            }
    
            // Handle success (optional):
            // - Display a success message 
            // - Set a timeout to allow the user to see the message
    
        } catch (error) {
            console.error("Error adding reading session:", error);
    
            // More specific error handling:
            if (error.code === 'firestore/unavailable') {
                // Handle network issue
            } else if (error.code === 'firestore/permission-denied') {
                // Handle permission issue
            } else {
                // Handle other errors 
            }
    
        } finally {
            // Consider keeping loading state active until after navigation
            // or use a different state variable for navigation 
            setLoading(false);
            router.replace("./bookslist");
        }
    };
    
    return (
        (loading) ? <Text>loading...</Text> :
            <View className="m-10 p-3" style={{ borderStyle: "solid", borderColor: active ? "#f97316" : "#e0e0e0", borderWidth: active ? 2 : 1 }}>
                <TextInput
                    ref={refPage}
                    value={page}
                    onChangeText={(text) => setPage(text)}
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

            <FinishedPage time={props.time} goHome={props.goHome} id={props.id} />

        </View >
    );
}