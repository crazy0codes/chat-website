import React from "react";

export function Navbar() {
    return (
        <div className="flex justify-between items-center p-2 bg-white border-b">
        <h1 className="text-lg font-bold">Chat App</h1>
        <div className="flex items-center">
            <button className="p-2 bg-primary text-white rounded">Login</button>
            <button className="p-2 bg-primary text-white rounded ml-2">Register</button>
        </div>
        </div>
    )
}