import React from "react";
import { useNavigate } from "react-router-dom";

export default function SECUREGATE() {
    const navigate = useNavigate();

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h2 className="text-xl font-semibold">Welcome</h2>
            <button
                onClick={handleLoginClick}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                LOGIN
            </button>
        </div>
    );
}
