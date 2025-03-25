"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const user = useUser();

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-stone-950 dark:text-white flex flex-col items-center">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center p-5 md:p-10 select-none">
        {/* Logo */}
        <Link href={"/"} className="logo font-bold">
          Scheduler
        </Link>

        {/* Log in Link */}
        <div className="login">
          {user ? (
            <UserButton />
          ) : (
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/handler/sign-up`}
              className="text-light-blue text-base font-medium"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center px-5 sm:pt-16  pt-10  max-w-2xl ">
        {/* Intro Text */}
        <div className="w-full relative flex items-center justify-center">
          <div className="flex gap-3 sm:text-sm text-[12px] w-fit select-none items-center opacity-70 mb-5 border p-2 px-6 border-gray-600 rounded-full">
            <p>Create class schedules without conflicts.</p>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
          Build schedules quickly
          <br /> and effortlessly
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg opacity-70 leading-relaxed mb-10">
          Organize your daily routines effortlessly with our advanced scheduler.{" "}
          <br />
          Experience seamless planning with intuitive tools and smart task
          management.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-5">
          <Link href={"/onboarding"}>
            <Button className="cursor-pointer">
              {
                user ? "Start Onboarding" : "Get Started"
              }
            </Button>
          </Link>
          <Link href={"/"}>
            <Button className="cursor-pointer">Know how to use ?</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
