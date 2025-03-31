export const validateInput = (name, value, formData = {}) => {
    if (!value.trim()) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return "Invalid email format";
        }
    }

    if (name === "name") {
        if (value.length < 2) {
            return "Name must be at least 2 characters";
        }
    }

    if (name === "password") {
        if (value.length < 6) {
            return "Password must be at least 6 characters";
        } else if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
        }
    }

    if (name === "confirmPassword") {
        if (value !== formData.password) {
            return "Passwords do not match";
        }
    }

    return "";
};
