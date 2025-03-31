import { createStore } from "redux";

// Load login state from localStorage
const loadState = () => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? { isLoggedIn: JSON.parse(savedState) } : { isLoggedIn: false };
};

// Reducer
const authReducer = (state = loadState(), action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("isLoggedIn", true);
            return { isLoggedIn: true };
        case "LOGOUT":
            localStorage.setItem("isLoggedIn", false);
            return { isLoggedIn: false };
        default:
            return state;
    }
};

// Create Store
const store = createStore(authReducer);

export default store;
