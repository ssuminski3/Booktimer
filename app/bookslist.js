import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Book from '../ui/book';
import { Link } from 'expo-router';
import CustomBook from '../ui/customBook';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, firebaseAuth } from '../firebase.config';

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
      const querySnapshot = await getDocs(query(collection(db, "books"), where("userId", "==", firebaseAuth.currentUser.uid)));
      const isbns = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setIsbns(isbns);
    }
    getBooks();
  }, [])
  return (
    <View className="bg-slate-200 h-full">
      <AddButton />
      <ScrollView>
        {isbns.map((i, index) => {
          if (index % 2 === 0) {
            var nextItem = isbns[index + 1]
            console.log("data: " + JSON.stringify(i))
            return (
              <View key={index} className="m-1" style={{ flexDirection: "row", height: 250 }}>
                {i.title ? <CustomBook title={i.title} id={i.id}/> : <Book isbn={i.isbn} id={i.id} readedPages={i.readedPages}/>}
                {nextItem && (nextItem.title ? <CustomBook title={nextItem.title} id={nextItem.id}/> : <Book isbn={nextItem.isbn} id={nextItem.id} readedPages={nextItems.readedPages}/>)}
              </View>
            )
          }
          return null
        })}
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