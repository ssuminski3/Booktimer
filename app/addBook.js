import { CameraView, useCameraPermissions } from 'expo-camera';
import { memo, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal, Image, TextInput } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../firebase.config'
import { router } from 'expo-router';

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false)
    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [enterIsbn, setEnterIsbn] = useState(false)
    const [enterTitle, setEnterTitle] = useState(false)
    const [next, setNext] = useState(false)
    const [pages, setPages] = useState(0)
    const [image, setImage] = useState()

    async function scannedAction(code) {
        if (!scanned && code != "") {
            setIsbn(code)
            console.log(code)
            try {
                const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${code}&jscmd=details&format=json`)
                console.log(code)
                console.log(`http://openlibrary.org/api/books?bibkeys=ISBN:${code}&jscmd=details&format=json`)
                const d = await response.json()
                setTitle(d["ISBN:" + code].details.title)
                setImage(d["ISBN:" + code].thumbnail_url.replace("S", "L"))
                 
            }
            catch(e) {
                console.log(e)
                try {
                    console.log("Using google API")
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${code}`)
                    const d = await response.json()
                    console.log(d.items)
                    setTitle(d.items[0].volumeInfo.title+" "+(d.items[0].volumeInfo.subtitle ? d.items[0].volumeInfo.subtitle: ""))
                    setImage(d.items[0].volumeInfo.imageLinks.thumbnail)
                    
                }
                catch(e){
                    alert("There is no such book")
                    console.log(e)
                }
            }
            finally {
                setLoading(false)
                setScanned(true)
            }
        }
    }

    function alertEnterISBN(){
        if(!next){
            setIsbn("")
            setScanned(false)
            setEnterIsbn(true)
        }
        else{
            setIsbn("")
            setScanned(false)
            setEnterTitle(true)
        }
    }
    async function addBookToDB(){
        if(pages == 0){
            try{
                const docRef = await addDoc(collection(db, "books"), {
                    isbn: isbn,
                    userId: firebaseAuth.currentUser.uid
                })
                console.log("Added ", docRef, enterTitle)
            }
            catch(e){
                console.error(e)
            }
        }
        else{
            try{
                const docRef = await addDoc(collection(db, "books"), {
                    title: title,
                    pages: pages
                })
                console.log("Added ", docRef, enterTitle)
            }
            catch(e){
                console.error(e)
            }
        }
        setScanned(false)
        router.replace("bookslist")
    }
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        requestPermission()
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={scanned}
                className="justify-center items-center bg-black w-full"
                onRequestClose={() => setScanned(false)}
            >
                <View className="bg-slate-100 w-4/5 h-5/6 p-2 m-auto shadow-2xl justify-center">
                    <Image source={{ uri: image }} resizeMode="contain" className="w-full h-3/5" />
                    <Text className="text-center m-3 text-xl">{title}</Text>
                    <Text className="text-center m-3 text-base">Is it correct book?</Text>
                    <View style={{flexDirection: 'row'}} className="justify-center">
                        <TouchableOpacity className="bg-orange-500 m-1 p-1 w-1/3 rounded-xl" onPress={addBookToDB}>
                            <Text className="text-center text-white">Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-orange-500 m-1 p-1 w-1/3 rounded-xl" onPress={alertEnterISBN}>
                            <Text className="text-center text-white">No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType='slide'
                transparent={true}
                visible={enterIsbn}
                onRequestClose={() => setEnterIsbn(false)}>
                    <View className="bg-slate-100 w-4/5 h-1/4 p-2 m-auto shadow-2xl justify-center">
                        <Text className="text-2xl mb-3">Enter ISBN</Text>
                        <TextInput placeholder="Enter your's book ISBN" className="m-1" onChangeText={(e) => setIsbn(e)}/>
                        <TouchableOpacity className="bg-orange-500 p-1 w-full rounded-lg" onPress={() => {
                            setEnterIsbn(false)
                            if(!enterIsbn)
                                memo(scannedAction(isbn))
                            setNext(true)
                        }}>
                            <Text className="text-center text-white">Enter ISBN</Text>
                        </TouchableOpacity>
                    </View>
            </Modal>
            <Modal
                animationType='slide'
                transparent={true}
                visible={enterTitle}
                onRequestClose={() => setEnterTitle(false)}>
                    <View className="bg-slate-100 w-4/5 h-1/3 p-2 m-auto shadow-2xl justify-center">
                        <Text className="text-2xl mb-3">Enter book's data</Text>
                        <TextInput placeholder="Enter your's book title" className="m-1" onChangeText={(e) => setTitle(e)}/>
                        <TextInput placeholder="Enter your's book's number of pages" keyboardType='number-pad' className="m-1" onChangeText={(e) => setPages(e)}/>
                        <TouchableOpacity className="bg-orange-500 p-1 w-full rounded-lg" onPress={() => {
                            setEnterTitle(false)
                            setNext(false)
                            addBookToDB()
                        }}>
                            <Text className="text-center text-white">Enter book</Text>
                        </TouchableOpacity>
                    </View>
            </Modal>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{ barcodeTypes: ['codabar', 'code128', 'code39', 'ean13', 'ean8', 'pdf417', 'upc_e', 'datamatrix', 'code93', 'itf14', 'upc_a'] }}
                onBarcodeScanned={(e) => { scannedAction(e.data) }}>
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
});