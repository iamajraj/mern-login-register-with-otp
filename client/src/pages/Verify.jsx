import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import axiosInstance from "../helpers/axiosInterceptor";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.email_verified_at) {
            navigate("/");
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!otp) return setError("Please enter the OTP to continue");
        setError("");

        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        try {
            const res = await axiosInstance.post("/auth/verify", {
                user_id: user._id,
                otp,
            });

            if (res.statusText === "OK") {
                console.log(res);
                localStorage.clear();
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                setSuccess(true);

                setTimeout(() => {
                    navigate("/");
                }, [1000]);
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
                {success ? (
                    <>
                        <h1 className="font-bold text-[25px]">
                            Your email address has been verified !
                        </h1>
                    </>
                ) : (
                    <>
                        <h1 className="font-bold text-[25px]">
                            A verification code has been sent to your email
                            address!
                        </h1>
                        <div className="border-t my-5"></div>
                        <form onSubmit={onSubmit}>
                            <InputField
                                type="number"
                                title="Enter the OTP"
                                placeholder="XXXXXX"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <p className="text-[13px] text-red-500 my-3">
                                {error}
                            </p>
                            <button className="bg-indigo-400 text-white py-3 rounded-lg cursor-pointer text-[18px] mt-2 w-full">
                                {loading ? "Verifying..." : "Submit"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
