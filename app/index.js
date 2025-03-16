import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase.config";
import { useRootNavigationState, Redirect } from 'expo-router';
import { useState, useEffect } from "react";
import colorMode from "../colorMode";
import { Appearance } from 'react-native';

export default function App() {
    const [user, setUser] = useState(null);
    const rootNavigationState = useRootNavigationState();
    const [loading, setLoading] = useState(true)

    global.colorMode = colorMode;
    global.colorMode.darkMode = (Appearance.getColorScheme() == 'dark');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    if (!rootNavigationState?.key || loading) return null;

    if (user) {
        console.log("User: " + JSON.stringify(user));
        return <Redirect href={"bookslist"} />;
    } else {
        return <Redirect href={"login"} />;
    }
}