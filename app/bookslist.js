import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Book from '../ui/book';
import { Link } from 'expo-router';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, firebaseAuth } from '../firebase.config';
import { SimpleGrid } from 'react-native-super-grid';
//Main color bg-orange-500, background bg-slate-200



export function AddButton() {
  return (
    <View style={styles.addButton}>
      <Link href={"./addBook"}>
        <Text style={styles.plus}>+</Text>
      </Link>
    </View>
  )
}

export default function App() {
  const [isbns, setIsbns] = useState([])
  useEffect(() => {
    async function getBooks() {
      const q = query(collection(db, "books"), where("userId", "==", firebaseAuth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const isbns = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setIsbns(isbns);
    }
    getBooks();
  }, [])
  return (
    <View className="bg-slate-200 flex-1 justify-center items-center">
      <AddButton />
      <ScrollView>
          <SimpleGrid 
            itemDimension={100}
            maxItemsPerRow={2}
            data={isbns}
            renderItem={({ item }) => <Book title={item.title} id={item.id} isbn={item.isbn} readedPages={item.readedPages} pages={item.pages}/>}
          />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#f97316',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    position: 'absolute',
    zIndex: 5,
    bottom: 20,
    right: 20
  },
  plus: {
    fontSize: 30,
    color: 'white'
  }
})