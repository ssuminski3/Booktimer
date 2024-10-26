import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import fetchBookDetails from "../fetchBook";

//0385472579
export default function Book(props) {
    const [isbn, setIsbn] = useState(props.isbn);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const bookDetails = await fetchBookDetails(isbn);
                setImage(bookDetails.image);
                setTitle(bookDetails.title);
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
        router.navigate({ pathname: "./bookRead", params: { isbn: isbn } });
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <TouchableOpacity className="bg-slate-100 w-2/5 h-full p-2 m-5 shadow-2xl" onPress={redirect}>
            <Image source={{ uri: image }} resizeMode="contain" className="w-full h-3/5" />
            <Text className="m-2">{title}</Text>
        </TouchableOpacity>
    );
}