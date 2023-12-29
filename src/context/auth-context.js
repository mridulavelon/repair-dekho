import React, { useState,useEffect, useContext } from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const[user,setUser] = useState('');
    const router = useRouter();


    useEffect(() => {
        setUser(document.cookie);
    },[])


    const login = (user) => {
        localStorage.setItem('token',user)
    }

    const logout = () => {
    }

    return (
        <AuthContext.Provider value={{ user,login,logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext)
}
