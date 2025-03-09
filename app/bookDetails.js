import fetchBookDetails from "../fetchBook"
import { useState, useEffect } from "react"
import { useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase.config";
import { Bar } from "react-native-progress";
import { router } from "expo-router";

export default function BookDetails() {
    const local = useLocalSearchParams();
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [pages, setPages] = useState(0)
    const [readedPages, setReadedPages] = useState(0);
    const [documentId, setDocumentId] = useState();
    const [image, setImage] = useState();
    const [thoughts, setThoughts] = useState([]);
    const [countTime, setCountime] = useState(0);

    useEffect(() => {
        const getBook = async () => {
            try {
                const book = doc(db, "books", local.documentID);
                const docSnap = await getDoc(book);
                if (docSnap.exists()) {
                    setDocumentId(docSnap.id);
                    const details = docSnap.data();
                    details.title && setTitle(details.title);
                    details.readedPages && setReadedPages(details.readedPages);
                    details.pages && setPages(details.pages);
                    details.isbn && setIsbn(details.isbn);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getBook();
    }, []);

    useEffect(() => {
        const getThoughts = async () => {
            try {
                const q1 = query(collection(db, "thoughts"), where("bookID", "==", documentId))
                const booksSnap = await getDocs(q1);
                const th = booksSnap.docs.map(doc => ({ ...doc.data() }));
                setThoughts(th);

                const q2 = query(collection(db, "readingSession"), where("bookId", "==", documentId))
                const read = await getDocs(q2);
                const rd = read.docs.map(doc => ({ ...doc.data() }))
                const sum = rd.reduce((sum, reading) => sum + reading.time, 0)
                setCountime(sum)
            }
            catch (e) {
                console.log(e)
            }
        }
        getThoughts()
    }, [documentId])

    useEffect(() => {
        if (isbn) {
            const fetchDetails = async () => {
                try {
                    const bookDetails = await fetchBookDetails(isbn, "L");
                    setImage(bookDetails.image);
                    setTitle(bookDetails.title);
                    bookDetails.pages && setPages(bookDetails.pages);
                } catch (err) {
                    setError("Failed to fetch book details.");
                    setLoading(false);
                }
            };
            fetchDetails();
        }
    }, [isbn]);

    const redirect = () => {
        if (isbn) {
            router.navigate({ pathname: "./bookRead", params: { isbn: isbn, id: documentId } });
        } else {
            router.navigate({ pathname: "./bookRead", params: { title: title, id: documentId } });
        }
    };
    return (
        <View className="flex-1 justify-center items-center bg-slate-200">

            <Image
                source={
                    image
                        ? { uri: image }
                        : require("../assets/default.png")
                }
                resizeMode="contain"
                className="w-full flex-1 m-1"
                alt={title}
            />
            <Text className="text-xl m-10">{title}</Text>
            {pages ? (
                <View className="block">
                    <Bar progress={readedPages / pages} color="#f97316" width={300} />
                    <Text className="text-right m-1">{readedPages}/{pages}</Text>
                </View>

            ) : null}
            <Text className="text-sm m-10">You read that book for {countTime} minutes</Text>
            <ScrollView className="w-full flex-1">
                <View className="flex-1 w-full m-3">
                    <View className="flex-row border-b border-gray-400 w-full pl-5 pr-5 justify-between">
                        <Text className="text-left">Thought</Text>
                        <Text className="text-right">Page</Text>
                    </View>
                    {
                        thoughts.map((item, index) => {
                            return (
                                <View key={index} className="flex-row w-full p-2 pl-5 pr-5 border-b border-gray-400 justify-between">
                                    <Text className="text-left">{item.thought}</Text>
                                    <Text className="text-right">{item.page}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View className="w-full p-1 bg-slate-100">
                <TouchableOpacity className="bg-orange-500 m-1 p-2 w-full rounded-xl" onPress={redirect}>
                    <Text className="text-center text-white">Start Reading</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}