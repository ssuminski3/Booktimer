import { Modal, View, Image, Text, TouchableOpacity } from "react-native";

export default function BookConfirmationModal(props) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.scanned}
            className="justify-center items-center bg-black w-full"
            onRequestClose={() => props.setScanned(false)}
        >
            <View className="bg-slate-100 w-4/5 h-5/6 p-2 m-auto shadow-2xl justify-center">
                <Image 
                    source={{ uri: props.image }} 
                    resizeMode="contain" 
                    className="w-full h-3/5" 
                />
                <Text className="text-center m-3 text-xl">{props.title}</Text>
                <Text className="text-center m-3 text-base">Is this the correct book?</Text>
                <View style={{ flexDirection: 'row' }} className="justify-center">
                    <TouchableOpacity 
                        className="bg-orange-500 m-1 p-1 w-1/3 rounded-xl" 
                        onPress={props.addBookToDB}
                    >
                        <Text className="text-center text-white">Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="bg-orange-500 m-1 p-1 w-1/3 rounded-xl" 
                        onPress={props.alertEnterISBN}
                    >
                        <Text className="text-center text-white">No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}