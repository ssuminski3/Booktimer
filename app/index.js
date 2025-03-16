import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase.config";
import { useRootNavigationState, Redirect } from 'expo-router';
import { useState } from "react";
import colorMode from "../colorMode";
import {Appearance} from 'react-native';

export default function App(){
    const [user, setUser] = useState(null);
    const rootNavigationState = useRootNavigationState();

    global.colorMode = colorMode;
    global.colorMode.darkMode = (Appearance.getColorScheme() == 'dark');

    onAuthStateChanged(firebaseAuth, (user) => {
        setUser(user);
    });
    if (!rootNavigationState?.key) return null;

    if (user) {
        console.log("User: " + JSON.stringify(user));
        return <Redirect href={"bookslist"}/>;
    } else {
        return <Redirect href={"login"}/>;
    }
}