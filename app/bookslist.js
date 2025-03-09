import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Book from '../ui/book';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, firebaseAuth } from '../firebase.config';
import { SimpleGrid } from 'react-native-super-grid';
import Fab from '../ui/fab';
//Main color bg-orange-500, background bg-slate-200





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
      <ScrollView>
        <SimpleGrid
          itemDimension={100}
          maxItemsPerRow={2}
          data={isbns}
          renderItem={({ item }) => <Book title={item.title} id={item.id} isbn={item.isbn} readedPages={item.readedPages} pages={item.pages} />}
        />
      </ScrollView>
      <View className="w-full">
        <Fab />
      </View>
    </View>
  );
}