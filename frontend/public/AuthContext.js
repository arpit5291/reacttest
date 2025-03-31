import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Check if user is logged in on page load
    useEffect(() => {
        axios
            .get("http://localhost:5000/profile", { withCredentials: true })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    // Login Function
    const login = async (email, password) => {
        try {
            await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
            const res = await axios.get("http://localhost:5000/profile", { withCredentials: true });
            setUser(res.data);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Login failed" };
        }
    };

    // Logout Function
    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const signup = async (name, email, password) => {
        try {
            await axios.post("http://localhost:5000/signup", { name, email, password }, { withCredentials: true });
            //setUser(null);
        } catch (err) {
            console.error("Signup error:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
