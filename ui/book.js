import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { router } from 'expo-router';

//0385472579
export default function Book(props){
    const [isbn, useIsbn] = useState(props.isbn)
    const [dane, setDane] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
                const d = await response.json()
                setDane(d["ISBN:"+isbn].details)
            }
            catch{
                console.log("Error")
            }
            finally{
                setLoading(false)
            }
        }
        getData()
    }, [])
    function login(){
        router.replace('login')
    }
    if(loading)
        return <Text>loading...</Text>
    return(
        <View className="bg-slate-100 w-2/5 h-full p-2 m-5 shadow-2xl" onTouchStart={login}>
            <Image source={{ uri: "https://covers.openlibrary.org/b/isbn/"+isbn+"-L.jpg"}} resizeMode="contain" className="w-full h-3/5"/>
            <Text className="m-2">{dane.title}</Text>
        </View>
    )
}