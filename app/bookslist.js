import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Book from '../ui/book';
import { Link } from 'expo-router';
import CustomBook from '../ui/customBook';

//Main color bg-orange-500, background bg-slate-200

const isbns = [

  {
    isbn: "0060935464"
  },
  {
    isbn: "9780385472579"
  },
  {
    isbn: "0743273567"
  },
  {
    isbn: "0316769487"
  },
  {
    isbn: "0-061-96436-0"
  },
  {
    isbn: "0-061-96436-0"
  },
  {
    title: "Book of Boba Fett",
    pages: 54
  }
]

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
  return (
    <View className="bg-slate-200">
      <AddButton />
      <ScrollView>
        {isbns.map((i, index) => {
          if (index % 2 === 0) {
            var nextItem = isbns[index + 1]
            return (
              <View key={index} className="m-1" style={{ flexDirection: "row", height: 250 }}>
                {i.title ? <CustomBook title={i.title}/> : <Book isbn={i.isbn} />}
                {nextItem && (nextItem.title ? <CustomBook title={nextItem.title}/> : <Book isbn={nextItem.isbn} />)}
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