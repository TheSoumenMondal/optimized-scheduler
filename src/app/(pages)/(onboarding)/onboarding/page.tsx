"use client";

import React, { useEffect, useState } from "react";
import CreateButton from "../_components/CreateButton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@stackframe/stack";
import History from "../_components/History";

const Onboarding = () => {
  const user = useUser();
  const email = user?.primaryEmail;
  const createAdmin = useMutation(api.admin.createAdmin);

  useEffect(() => {
    if (user?.displayName && email) {
      createAdmin({
        name: user.displayName,
        email: email,
      });
    }
  }, [user, email, createAdmin]);

  return (
    <div className="w-full h-full pt-8">
      <CreateButton />
      <Separator className="mt-6" />
      {/* show cards previous institutions */}
      <div className="pt-6">
        <History/>
      </div>
    </div>
  );
};

export default Onboarding;
