'use client'

import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import DepartmentCard from "./DepartmentCard";

interface AddDepartmentProps {
  id: string;
}

const AddDepartment = ({ id }: AddDepartmentProps) => {
  const [departmentName, setDepartmentName] = useState("");
  const [minClasses, setMinClasses] = useState<number>(0);
  const [maxClasses, setMaxClasses] = useState<number>(0);

  const addDepartment = useMutation(api.department.addDepartment);

  const handleSubmit = async () => {
    if (departmentName === "" || minClasses === 0 || maxClasses === 0) {
      toast.error("Please fill all the fields", {
        position: "top-right",
      });
      return;
    }
    try {
      const response = await addDepartment({
        course_id: id as any,
        name: departmentName,
        minimum_classes_per_day: minClasses,
        max_classes_per_day: maxClasses,
      });
      if (response === 404) {
        toast.error("Department already exists", {
          position: "top-right",
        });
        return;
      }
      toast.success("Department created successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  };

  return (
    <div className="w-[80vw] rounded-lg dark:bg-stone-950 bg-white h-[80vh] flex flex-row gap-2">
      <div className="w-2/3 h-full flex items-center justify-center px-6">
        <DepartmentCard id={id} />
      </div>
      <div className="w-1/3 space-y-3 py-6 pr-10 h-full flex flex-col">
        <p className="font-bold text-xl">
          Enter a details to add new department here
        </p>
        <Label>Enter the department name</Label>
        <Input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <Label>Enter the minimum number of classes per day</Label>
        <Input
          placeholder="Enter the minimum number of classes per day"
          type="number"
          value={minClasses}
          onChange={(e) => setMinClasses(Number(e.target.value))}
        />
        <Label>Enter the maximum number of classes per day</Label>
        <Input
          type="number"
          value={maxClasses}
          onChange={(e) => setMaxClasses(Number(e.target.value))}
        />

        <Button className="cursor-pointer" onClick={handleSubmit}>
          Create Department
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default AddDepartment;
