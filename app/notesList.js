import fetchBookDetails from "../fetchBook"
import { useState, useEffect } from "react"
import { useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, firebaseAuth } from "../firebase.config";
import { Bar } from "react-native-progress";
import { router } from "expo-router";

export default function BookDetails() {
    const [thoughts, setThoughts] = useState([]);

    useEffect(() => {
        const getThoughts = async () => {
            try {
                const q1 = query(collection(db, "thoughts"), where("userID", "==", firebaseAuth.currentUser.uid))
                const booksSnap = await getDocs(q1);
                const th = booksSnap.docs.map(doc => ({ ...doc.data() }));
                setThoughts(th);
                console.log("WHERE: "+JSON.stringify(th))
            }
            catch (e) {
                console.log(e)
            }
        }
        getThoughts()
    }, [])

    const redirect = (documentID) => {
        router.navigate({ pathname: "./bookDetails", params: { documentID: documentID } });
      };
    return (
        <ScrollView className="w-full flex-1 bg-slate-200">
            <View className="flex-1 w-full m-3">
                <View className="flex-row border-b border-gray-400 w-full pl-5 pr-5 justify-between">
                    <Text className="text-left text-xl">Thought</Text>
                    <Text className="text-right text-xl">Page</Text>
                </View>
                {
                    thoughts.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} className="flex-row w-full p-5 border-b border-gray-400 justify-between" onPress={() => redirect(item.bookID)}>
                                <Text className="text-left w-3/4">{item.thought}</Text>
                                <Text className="text-right w-1/4">{item.page}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}