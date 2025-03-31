import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = (e) => {
        e.preventDefault();
        alert("Signup Successful! You can now log in.");
        navigate("/login");
    };
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    );
};
export default Signup;
