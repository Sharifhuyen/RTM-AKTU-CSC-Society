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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔁 Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const firstName = currentUser.displayName?.split(" ")[0] || "User";
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    firstName,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 🔐 Register new user with display name
    const register = async (email, password, fullName) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: fullName });

        // Manually set user so it's available right away
        setUser({
            uid: result.user.uid,
            email: result.user.email,
            firstName: fullName.split(" ")[0],
        });
    };

    // 🔓 Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 🚪 Logout
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
