import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Book from '../ui/book';

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
]

export default function App() {
  return (
   <ScrollView className="bg-slate-200">
      {isbns.map((i, index) => {
        if(index%2 === 0){
          var nextItem = isbns[index+1]
          return(
            <View key={index} className="m-1" style={{flexDirection: "row", height: 250}}>
              <Book isbn={i.isbn} />
              {nextItem && (<Book isbn={nextItem.isbn}/>)}
            </View>
          )
        }
        return null
      })}
    </ScrollView>
  );
}

