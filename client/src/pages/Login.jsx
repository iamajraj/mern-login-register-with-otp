import React, { useState } from "react";
import { InputField } from "../components/InputField";
import axiosInstance from "../helpers/axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onChange = (e) => {
        setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const login = async (e) => {
        e.preventDefault();
        setError(null);

        if (!loginInfo.email || !loginInfo.password) {
            return setError("All fields are required");
        }
        setLoading(true);

        try {
            const res = await axiosInstance.post("/auth/login", loginInfo);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/");
        } catch (err) {
            setError(
                err.response.data?.error
                    ? err.response.data.error
                    : "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
            <div className="bg-white border rounded-lg max-w-[500px] w-full py-5 px-10">
                <h1 className="font-bold text-[30px]">Login</h1>
                <p className="text-[13px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus, repudiandae.
                </p>
                <div className="border-t my-5"></div>
                <form onSubmit={login} className="flex flex-col gap-3">
                    <InputField
                        name="email"
                        onChange={onChange}
                        value={loginInfo.email}
                        type="email"
                        title="Email"
                        placeholder="Enter your email address"
                    />
                    <InputField
                        name="password"
                        onChange={onChange}
                        value={loginInfo.password}
                        type="password"
                        title="Password"
                        placeholder="Enter your password"
                    />
                    <p className="text-red-500 text-[14px]">{error}</p>
                    <button
                        disabled={loading}
                        className="bg-indigo-400 text-white py-3 rounded-lg cursor-pointer text-[18px] mt-2"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="pt-4 text-[14px] text-center mr-3 ">
                    Don't have an account ?{" "}
                    <Link className="underline" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
