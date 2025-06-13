"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();

  return (
    <div className="min-h-screen">
      {session?.status === "unauthenticated" && (
        <div className="flex flex-col justify-between items-end h-screen mr-5 mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        </div>
      )}
      <div className="flex flex-col justify-between items-end h-screen mr-5 mt-2">
        {/* Add a button to sign out if user is signed in */}
        {session?.status === "authenticated" && (
          <div className="flex flex-col justify-between items-end h-screen mr-5 mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-900"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
