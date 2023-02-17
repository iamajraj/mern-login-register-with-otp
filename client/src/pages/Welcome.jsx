import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Welcome = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);
    return (
        <>
            <div className="w-full h-screen bg-gradient-to-tr from-indigo-500 to-violet-500 flex flex-col gap-4 items-center justify-center">
                <h1 className="text-[40px] text-white">
                    Welcome {user && user.first_name} {user && user.last_name}
                </h1>
                <p className="text-white">{user && user.email}</p>

                {user && !user.email_verified_at ? (
                    <p className="text-white text-[14px]">
                        Your email is not verified yet{" "}
                        <Link to="/verify" className="underline">
                            verify now
                        </Link>
                    </p>
                ) : null}

                <button
                    onClick={logout}
                    className="border-2 rounded-lg px-3 py-2 cursor-pointer hover:border-blue-500 transition-all bg-white"
                >
                    Logout
                </button>
            </div>
        </>
    );
};
