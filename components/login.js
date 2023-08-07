import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center text-lg m-5">
      {session ? (
        <>
          <h1 className="mx-5 p-3 font-bold border rounded-md border-green-500">
            You are signed in with{" "}
            <span className="text-green-500">{session.user.email}</span>
          </h1>
          <button
            onClick={() =>
              signOut("google", { callbackUrl: "http://localhost:3000" })
            }
            className="px-4 py-2 bg-red-500 rounded-md text-white font-medium shadow hover:bg-red-600"
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google", "http://localhost:3000")}
          className="px-4 py-1 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Login;
