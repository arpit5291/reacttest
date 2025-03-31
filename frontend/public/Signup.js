import React, { useState } from "react";
import { validateInput } from "../src/utils/validation"; // Import common validation
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
const SignupForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", name: "" });
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", name: "" });
    const [loading, setLoading] = useState(false);

    const handleValidation = (name, value, formData = {}) => {
        const errorMsg = validateInput(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleValidation("email", formData.email);
        handleValidation("name", formData.name);
        handleValidation("password", formData.password);
        handleValidation("confirmPassword", formData.confirmPassword, formData);

        if (formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
            return;
        }

        if (!errors.email && !errors.password && !errors.confirmPassword && formData.email && formData.password && formData.confirmPassword) {
            setLoading(true);
            try {
                const response = await signup(formData.name, formData.email, formData.password);
                navigate("/");
                toast.success("Signup successful! You can now log in.");
            } catch (err) {
                if (!err.response) {
                    toast.error("Network error. Please check your internet connection.");
                } else if (err.response.status === 400) {
                    toast.error(err.response.data.error || "User already exists.");
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
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onKeyUp={(e) => handleValidation(e.target.name, e.target.value)}
                    style={{ border: errors.name ? "2px solid red" : "2px solid #ccc", marginBottom: "10px" }}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                {/* Email Input */}
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onKeyUp={(e) => handleValidation(e.target.name, e.target.value)}
                    style={{ border: errors.email ? "2px solid red" : "2px solid #ccc", marginBottom: "10px" }}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onKeyUp={(e) => handleValidation(e.target.name, e.target.value)}
                    style={{ border: errors.password ? "2px solid red" : "2px solid #ccc", marginBottom: "10px" }}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                {/* Confirm Password Input */}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    onKeyUp={(e) => handleValidation(e.target.name, e.target.value, { ...formData })}
                    style={{ border: errors.confirmPassword ? "2px solid red" : "2px solid #ccc", marginBottom: "10px" }}
                />
                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

                <button disabled={loading} type="submit" className="submit-btn">
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <Link to="/login">Already have an account? Login</Link>
                <Link to="/">Home</Link>
            </form>
        </div>
    );
};

export default SignupForm;
