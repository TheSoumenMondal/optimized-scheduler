"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SectionModel from "../../_components/SectionModal";
import GetSections from "../../_components/GetSections";
import AddSubject from "../../_components/AddSubject";

const Departments = () => {
  const { id } = useParams();
  const getDepartmentDetails = useQuery(api.department.getDepartmentDetails, {
    department_id: id as any,
  });

  if (!getDepartmentDetails) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="font-bold text-xl">
        Course Name : {getDepartmentDetails.name}
      </div>
      <Separator className="my-2 py-[0.2px] mt-4 bg-black dark:bg-white" />
      <div className="flex w-full h-full items-center justify-center gap-2 py-3 px-4 ">
        <div className="w-full h-full rounded-xl">
          <div className="w-full justify-end flex">
            <SectionModel />
          </div>
          {/* Show Sections */}
          <div>
            <GetSections/>
          </div>
        </div>
        <div className="w-full h-full bg-yellow-400 rounded-xl">
          <div className="w-full flex justify-end">
            <AddSubject/>
          </div>

          {/* Show Subjects */}

          <div></div>
        </div>
      </div>
      <div className="w-full px-4 flex justify-end gap-4 flex-row pb-4">
        <Button className="w-64 cursor-pointer">Next</Button>
      </div>
    </div>
  );
};

export default Departments;
