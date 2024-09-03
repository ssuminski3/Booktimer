import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { router } from 'expo-router';

//0385472579
export default function Book(props) {
    const [isbn, useIsbn] = useState(props.isbn)
    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
                const d = await response.json()
                setTitle(d["ISBN:" + isbn].details.title)
                setImage(d["ISBN:" + isbn].thumbnail_url.replace("S", "L"))
            }
            catch {
                try {
                    //console.log("Using google API")
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                    const d = await response.json()
                    //console.log(d.items)
                    setTitle(d.items[0].volumeInfo.title+" "+(d.items[0].volumeInfo.subtitle ? d.items[0].volumeInfo.subtitle: ""))
                    setImage(d.items[0].volumeInfo.imageLinks.thumbnail)
                    
                }
                catch(e){
                    console.log(e)
                }
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    const redirect = () => {
        console.log("bookRead")
        router.navigate({pathname: "./bookRead", params: {isbn: isbn}})
    }
    if (loading)
        return <Text>loading...</Text>
    return (
        <View className="bg-slate-100 w-2/5 h-full p-2 m-5 shadow-2xl" onTouchEnd={redirect}>
            <Image source={{ uri: image }} resizeMode="contain" className="w-full h-3/5" />
            <Text className="m-2">{title}</Text>
        </View>
    )
}