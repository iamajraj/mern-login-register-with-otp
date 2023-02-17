import React, { useState } from "react";
import { InputField } from "../components/InputField";
import axiosInstance from "../helpers/axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [registerInfo, setRegisterInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        dob: "",
        nationality: "",
        referral_code: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onChange = (e) => {
        setRegisterInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const register = async (e) => {
        e.preventDefault();
        setError(null);

        if (
            !registerInfo.email ||
            !registerInfo.password ||
            !registerInfo.first_name ||
            !registerInfo.last_name
        ) {
            return setError("All fields marked with (*) are required");
        }
        setLoading(true);

        try {
            const res = await axiosInstance.post(
                "/auth/register",
                registerInfo
            );

            if (res.statusText === "OK") {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                navigate("/verify");
            }
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
        <div className="w-full py-5 min-h-screen bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
            <div className="bg-white border rounded-lg max-w-[700px] w-full py-5 px-10">
                <h1 className="font-bold text-[30px]">Register</h1>
                <p className="text-[13px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus, repudiandae.
                </p>
                <div className="border-t my-5"></div>
                <form onSubmit={register} className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <InputField
                            name="first_name"
                            onChange={onChange}
                            value={registerInfo.first_name}
                            type="text"
                            title="First Name *"
                            placeholder="Enter your first name"
                        />
                        <InputField
                            name="last_name"
                            onChange={onChange}
                            value={registerInfo.last_name}
                            type="text"
                            title="Last Name *"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <InputField
                        name="dob"
                        onChange={onChange}
                        value={registerInfo.dob}
                        type="date"
                        title="Date of birth"
                    />
                    <InputField
                        name="nationality"
                        onChange={onChange}
                        value={registerInfo.nationality}
                        type="text"
                        title="Nationality"
                        placeholder="Enter your nationality"
                    />
                    <InputField
                        name="referral_code"
                        onChange={onChange}
                        value={registerInfo.referral_code}
                        type="text"
                        title="Referral Code"
                        placeholder="Enter the referral code"
                    />
                    <InputField
                        name="email"
                        onChange={onChange}
                        value={registerInfo.email}
                        type="email"
                        title="Email *"
                        placeholder="Enter your email address"
                    />
                    <InputField
                        name="password"
                        onChange={onChange}
                        value={registerInfo.password}
                        type="password"
                        title="Password *"
                        placeholder="Enter your password"
                    />
                    <p className="text-red-500 text-[14px]">{error}</p>
                    <button
                        disabled={loading}
                        className="bg-indigo-400 text-white py-3 rounded-lg cursor-pointer text-[18px] mt-2"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
                <p className="pt-4 text-[14px] text-center mr-3 ">
                    Already have an account ?{" "}
                    <Link className="underline" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
