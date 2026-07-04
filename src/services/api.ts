import axios from "axios";

const API = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL ||
        "http://192.168.1.6:5000/api",

    timeout: 30000,
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================

API.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },

    (error) => Promise.reject(error),
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================

API.interceptors.response.use(
    (response) => response,

    (error) => {
        if (
            error.response?.status === 401 &&
            typeof window !== "undefined"
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            if (window.location.pathname.startsWith("/admin")) {
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    },
);

export default API;
