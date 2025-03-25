"use client";

import { Input } from "@/components/ui/input";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function CustomCredentialSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const app = useStackApp();

  const onSubmit = async () => {
    if (!password) {
      toast.error("Please provide all correct details.", {
        duration: 1500,
        position: "top-right",
      });
      setError("Please enter your password");
      return;
    }
    const result = await app.signUpWithCredential({ email, password });
    if (result.status === "error") {
      setError(result.error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center dark:bg-black ">
      <div className="w-auto h-auto p-6 space-y-4 rounded-2xl text-center">
        <h1 className="text-2xl text-start pl-0 font-semibold px-8 tracking-tight">
          Welcome to <Link href={"/"} className="font-bold">Scheduler</Link> <br /> The
          ultimate schedule planner
        </h1>
        <p className="text-gray-400 pl-0 text-start text-sm font-bold">
          Make schedules in lesser time
        </p>

        <div className="flex flex-col space-y-3">
          <Button
            className="flex items-center cursor-pointer justify-center gap-4  py-2 rounded-lg"
            onClick={async () => {
              await app.signInWithOAuth("github");
            }}
          >
            Sign up with github
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </span>
          </Button>
          <Button
            className="flex items-center cursor-pointer justify-center gap-4 py-2 rounded-lg"
            onClick={async () => {
              await app.signInWithOAuth("google");
            }}
          >
            Sign Up with Google
            <span>
              <svg
                version="1.1"
                width="20"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
                xmlSpace="preserve"
              >
                <path
                  style={{ fill: "#FBBB00" }}
                  d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
  c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
  C103.821,274.792,107.225,292.797,113.47,309.408z"
                ></path>
                <path
                  style={{ fill: "#518EF8" }}
                  d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
  c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
  c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                ></path>
                <path
                  style={{ fill: "#28B446" }}
                  d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
  c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
  c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                ></path>
                <path
                  style={{ fill: "#F14336" }}
                  d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
  c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
  C318.115,0,375.068,22.126,419.404,58.936z"
                ></path>
              </svg>
            </span>
          </Button>
        </div>

        <form
          className="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <p className="text-red-400 text-[10px] justify-start">{error}</p>
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="cursor-pointer">
            Sign Up
          </Button>
        </form>

        <p className="text-gray-500 text-[10px] mt-4">
          Please make sure you enter correct details
        </p>
        <Link href={"/signin"}>
          <p className=" underline text-sky-500 text-[10px] mt-4">
            Already have an account ?
          </p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
}
