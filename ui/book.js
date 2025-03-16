import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import fetchBookDetails from "../fetchBook";
import { Bar } from "react-native-progress";

export default function BookCard(props) {
  const hasISBN = Boolean(props.isbn);
  const [title, setTitle] = useState(props.title || null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(hasISBN);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(props.pages);
  
  const isbn = props.isbn;
  const readedPages = props.readedPages;
  const id = props.id;

  useEffect(() => {
    if (hasISBN) {
      const fetchDetails = async () => {
        try {
          const bookDetails = await fetchBookDetails(isbn, "M");
          setImage(bookDetails.image);
          setTitle(bookDetails.title);
          setPages(bookDetails.pages);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch book details.");
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isbn]);
  
  const redirect = () => {
    if (hasISBN) {
      router.navigate({ pathname: "./bookDetails", params: { isbn: isbn, documentID: id } });
    } else {
      router.navigate({ pathname: "./bookDetails", params: { title: title, documentID: id } });
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <TouchableOpacity
      className={`p-2 shadow-2xl flex-1 ${global.colorMode.secondaryColors[global.colorMode.darkMode]}`}
      onPress={redirect}
    >
      <Image
        source={
          image
            ? { uri: image }
            : require("../assets/default.png")
        }
        resizeMode="contain"
        className="w-full flex-1"
      />
      <Text className={`m-1 ${global.colorMode.textColors[global.colorMode.darkMode]}`}>{title}</Text>
      {/* Show progress bar if both readedPages and pages are available */}
      {pages ? (
        <Bar progress={readedPages / pages} width={null} color="#f97316" />
      ) : null}
    </TouchableOpacity>
  );
}
