"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Hero } from "../../_components/Hero";

export default function DashboardPage() {
  const { id } = useParams();

  const getSingleInstitutionDetails = useQuery(
    api.institution.getSingleInstitutionDetails,
    {
      institution_id: id as any,
    }
  );

  return getSingleInstitutionDetails ? (
    <div className="flex flex-col space-y-2 mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="font-bold text-start text-xl p-4 pl-0 items-center">
          <div className="flex flex-col gap-2">
            {getSingleInstitutionDetails?.name}
            <div className="font-bold text-[12px] cursor-pointer select-none">
              {
                <div className="flex items-center flex-row gap-1">
                  <Link href={"/onboarding"}>Onboarding</Link>
                  {"  "}
                  <p className="flex items-center justify-center">
                    {" >       Dashboard"}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <div className="w-full h-[74vh]">
        <Hero />
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2Icon className="w-10 h-10 animate-spin" />
    </div>
  );
}
