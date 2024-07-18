import { onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";
import { firebaseAuth } from "../firebase.config";
import { useRootNavigationState, Redirect } from 'expo-router';
import { useState } from "react";

export default function App(){
    const [user, setUser] = useState(null);
    const rootNavigationState = useRootNavigationState();

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