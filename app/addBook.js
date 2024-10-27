import { CameraView, useCameraPermissions } from 'expo-camera';
import { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../firebase.config';
import { router } from 'expo-router';
import BookConfirmationModal from '../ui/BookConfirmationModal';
import ISBNModal from '../ui/ISBNModal';
import BookDataEntryModal from '../ui/bookDataEntryModal';
import fetchBookDetails from '../fetchBook';

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [enterIsbn, setEnterIsbn] = useState(false);
    const [enterTitle, setEnterTitle] = useState(false);
    const [next, setNext] = useState(false);
    const [pages, setPages] = useState(0);
    const [image, setImage] = useState();

    const scannedAction = async (code) => {
        if (loading || isbn != "") return;
        console.log(code)
        setIsbn(code);
        setLoading(true)
        const bookDetails = await fetchBookDetails(code, true);
        console.log(bookDetails)
        setTitle(bookDetails.title)
        setImage(bookDetails.image)
        setLoading(false);
        if(bookDetails.title)
            setScanned(true);
    };

    const alertEnterISBN = () => {
        setIsbn("");
        setScanned(false);
        next ? setEnterTitle(true) : setEnterIsbn(true);
    };

    const addBookToDB = async () => {
        const bookData = pages === 0
            ? { isbn, userId: firebaseAuth.currentUser.uid, readedPages: 0 }
            : { title, pages, userId: firebaseAuth.currentUser.uid, readedPages: 0 };

        try {
            const docRef = await addDoc(collection(db, "books"), bookData);
            console.log("Added ", docRef);
        } catch (error) {
            console.error(error);
        } finally {
            setScanned(false);
            router.replace("bookslist");
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        requestPermission();
    }

    return (
        <View style={styles.container}>
            <BookConfirmationModal
                scanned={scanned}
                image={image}
                title={title}
                addBookToDB={addBookToDB}
                alertEnterISBN={alertEnterISBN}
            />
            <ISBNModal
                visible={enterIsbn}
                onClose={() => setEnterIsbn(false)}
                onSubmit={() => {
                    if (!enterIsbn)
                        memo(scannedAction(isbn))
                    setNext(true)
                }}
                isbn={isbn}
                setIsbn={setIsbn}
            />
            <BookDataEntryModal
                visible={enterTitle}
                onClose={() => setEnterTitle(false)}
                setTitle={setTitle}
                setPages={setPages}
                addBookToDB={addBookToDB}
            />
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{ barcodeTypes: ['codabar', 'code128', 'code39', 'ean13', 'ean8', 'pdf417', 'upc_e', 'datamatrix', 'code93', 'itf14', 'upc_a'] }}
                onBarcodeScanned={(e) => scannedAction(e.data)}>
                 <View style={{flexDirection: 'row'}} className="flex-1 justify-center items-end mb-10">
                        <TouchableOpacity className="bg-orange-500 m-1 p-2 w-1/3 rounded-xl" onPress={() => setEnterIsbn(true)}>
                            <Text className="text-center text-white">Enter ISBN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-orange-500 m-1 p-2 w-2/5 rounded-xl" onPress={() => setEnterTitle(true)}>
                            <Text className="text-center text-white">Enter book's details</Text>
                        </TouchableOpacity>
                    </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FF9900',
        margin: 1,
        padding: 5,
        width: '45%',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
});