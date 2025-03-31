import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateInput } from "../src/utils/validation";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        api: "",
    });

    const handleValidation = (name, value, formData = {}) => {
        const errorMsg = validateInput(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();


        handleValidation("email", formData.email);
        handleValidation("password", formData.password);
        if (!errors.email && !errors.password && formData.email && formData.password) {
            setLoading(true);
            try {
                const response = await login(formData.email, formData.password);
                toast.success("Login successful!");
                navigate("/");
            } catch (err) {
                if (!err.response) {
                    toast.error("Network error. Please check your internet connection.");
                } else if (err.response.status === 401) {
                    toast.error("Incorrect email or password.");
                } else if (err.response.status === 500) {
                    toast.error("Server error. Please try again later.");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }
            setLoading(false);

        }

    };


    return (
        <div style={{ width: "300px", margin: "20px auto", textAlign: "center" }}>
            {/* Email Input */}
            <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyUp={(e) => handleValidation(e.target.name, e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: errors.email ? "2px solid red" : "2px solid #ccc",
                    marginBottom: "10px",
                }}
            />
            {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}

            {/* Password Input */}
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyUp={(e) => handleValidation(e.target.name, e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: errors.password ? "2px solid red" : "2px solid #ccc",
                    marginBottom: "10px",
                }}
            />
            {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>}

            {/* Login Button */}
            <button disabled={loading}
                onClick={handleLogin}
                className="submit-btn"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
        </div>
    );
};

export default Login;
