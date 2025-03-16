import { router } from "expo-router";
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from "@expo/vector-icons";

export default function Fab() {
    const actions = [
        {
            text: "Add a book",
            position: 2,
            name: "./addBook",
            color: "#f97316",
            icon: <Ionicons name="add" size={24} color="white" />
        },
        {
            text: "List of notes",
            color: "#f97316",
            name: "./notesList",
            icon: <Ionicons name="create" size={24} color="white" />,
        },
        {
            text: "Settings",
            name: "./settings",
            color: "#f97316",
            icon: <Ionicons name="settings" size={24} color="white" />,
        },
    ];
    return (
            <FloatingAction
                actions={actions}
                color="#f97316"
                floatingIcon={<Ionicons name="albums" size={24} color="white" />}
                onPressItem={destination => {
                    router.push(destination);
                }}
            />

    )
}