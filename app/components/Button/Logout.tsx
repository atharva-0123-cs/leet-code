'use client'
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

const Logout = () => {


    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
    }

    return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer
       rounded text-brand-orange hover:text-orange-500"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
