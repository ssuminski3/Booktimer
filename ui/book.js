import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import fetchBookDetails from "../fetchBook";
import {Bar} from 'react-native-progress'

//0385472579
export default function Book(props) {
    const [isbn, setIsbn] = useState(props.isbn);
    const [readedPages, setReadedPages] = useState(props.readedPages)
    const [id, setId] = useState(props.id);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pages, setPages] = useState(0)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const bookDetails = await fetchBookDetails(isbn);
                setImage(bookDetails.image);
                setTitle(bookDetails.title);
                setPages(bookDetails.pages)
                if (bookDetails.title) {
                    setLoading(false);
                }
            } catch (err) {
                setError("Failed to fetch book details.");
                setLoading(false);
            }
        };
        
        fetchDetails();
    }, [isbn]);

    const redirect = () => {
        console.log("bookRead");
        router.navigate({ pathname: "./bookRead", params: { isbn: isbn, id: id } });
    };
    console.log(pages)
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <TouchableOpacity className="bg-slate-100 w-2/5 h-full p-2 m-5 shadow-2xl" onPress={redirect}>
            <Image source={{ uri: image }} resizeMode="contain" className="w-full h-3/5" />
            <Text className="m-2">{title}</Text>
            <Bar progress={readedPages/pages} width={null} color="#f97316"/>
        </TouchableOpacity>
    );
}