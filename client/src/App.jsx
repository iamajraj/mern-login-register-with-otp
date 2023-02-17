import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { Verify } from "./pages/Verify";

const Protected = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (!token) {
            return navigate("/login", { replace: true });
        }
    }, []);

    return children;
};

const AuthRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            return navigate("/", { replace: true });
        }
    }, []);

    return children;
};

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected>
                        <Welcome />
                    </Protected>
                }
            />
            <Route
                path="/login"
                element={
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <AuthRoute>
                        <Register />
                    </AuthRoute>
                }
            />
            <Route
                path="/verify"
                element={
                    <Protected>
                        <Verify />
                    </Protected>
                }
            />
            <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
    );
}

export default App;
