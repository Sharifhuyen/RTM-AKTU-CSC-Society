import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Firebase user
    const [dbUser, setDbUser] = useState(null); // Backend user
    const [loading, setLoading] = useState(true);

    // Fetch user from backend
    const fetchDbUser = async (email) => {
        try {
            const response = await fetch(`https://rtm-aktu-csc-society-server-side.onrender.com/user/?email=${email}`);
            if (!response.ok) throw new Error("User not found");
            const contentType = response.headers.get("content-type");
            if (!contentType.includes("application/json")) {
                throw new Error("Invalid JSON response");
            }
            const data = await response.json();
            if (data && data.email) {
                setDbUser(data);
            } else {
                setDbUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch DB user:", error);
            setDbUser(null);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const firstName = currentUser.displayName?.split(" ")[0] || "User";
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    firstName,
                });
                await fetchDbUser(currentUser.email);
            } else {
                setUser(null);
                setDbUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []); // Only run on mount

    console.log(user)


    const register = async (email, password, fullName) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: fullName });

        setUser({
            uid: result.user.uid,
            email: result.user.email,
            firstName: fullName.split(" ")[0],
        });

        await fetchDbUser(result.user.email);
    };

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser({
            uid: result.user.uid,
            email: result.user.email,
            firstName: result.user.displayName?.split(" ")[0] || "User",
        });
        await fetchDbUser(result.user.email);
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setDbUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, dbUser, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
