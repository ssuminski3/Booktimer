import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const ISBNModal = ({ visible, onClose, onSubmit, isbn, setIsbn }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View className={`${global.colorMode.secondaryColors[global.colorMode.darkMode]} w-4/5 h-1/4 p-2 m-auto shadow-2xl justify-center`}>
                <Text className={`text-2xl mb-3 ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Enter ISBN</Text>
                <TextInput
                    placeholder="Enter your book's ISBN"
                    className="m-1"
                    onChangeText={setIsbn}
                    value={isbn}
                />
                <TouchableOpacity
                    className="bg-orange-500 p-1 w-full rounded-lg"
                    onPress={() => {
                        onClose();
                        if (isbn) {
                            onSubmit(isbn);
                        }
                    }}>
                    <Text className={`text-center text-white ${global.colorMode.textColors[global.colorMode.darkMode]}`}>Enter ISBN</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ISBNModal;