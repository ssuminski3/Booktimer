import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const BookDataEntryModal = ({ visible, onClose, setTitle, setPages, addBookToDB }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className={`${global.colorMode.secondaryColors[global.colorMode.darkMode]} w-4/5 h-1/3 p-2 m-auto shadow-2xl justify-center`}>
                <Text className={`text-2xl mb-3 ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Enter book's data</Text>
                <TextInput
                    placeholder="Enter your book's title"
                    className="m-1"
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Enter your book's number of pages"
                    keyboardType='number-pad'
                    className="m-1"
                    onChangeText={setPages}
                />
                <TouchableOpacity
                    className="bg-orange-500 p-1 w-full rounded-lg"
                    onPress={() => {
                        onClose();
                        addBookToDB();
                    }}
                >
                    <Text className={`text-center text-white ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Enter book</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default BookDataEntryModal;