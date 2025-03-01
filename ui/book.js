import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import fetchBookDetails from "../fetchBook";
import { Bar } from "react-native-progress";

export default function BookCard(props) {
  // If an ISBN is provided, we assume we want to fetch details.
  const hasISBN = Boolean(props.isbn);
  
  // Use provided title or fetched title.
  const [title, setTitle] = useState(props.title || null);
  // Image will come from the fetch (if available) or fall back to default.
  const [image, setImage] = useState(null);
  // Loading and error state for fetch.
  const [loading, setLoading] = useState(hasISBN);
  const [error, setError] = useState(null);
  // Pages (for progress bar) is only relevant if we have a fetch.
  const [pages, setPages] = useState(props.pages);
  
  const isbn = props.isbn;
  const readedPages = props.readedPages;
  const id = props.id;

  useEffect(() => {
    if (hasISBN) {
      const fetchDetails = async () => {
        try {
          const bookDetails = await fetchBookDetails(isbn);
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
      router.navigate({ pathname: "./bookRead", params: { isbn: isbn, id: id } });
    } else {
      router.navigate({ pathname: "./bookRead", params: { title: title, id: id } });
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <TouchableOpacity
      className="bg-slate-100 p-2 shadow-2xl flex-1"
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
      <Text className="m-1">{title}</Text>
      {/* Show progress bar if both readedPages and pages are available */}
      {pages ? (
        <Bar progress={readedPages / pages} width={null} color="#f97316" />
      ) : null}
    </TouchableOpacity>
  );
}
