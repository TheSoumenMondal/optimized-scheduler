"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useParams, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxGroup } from "@heroui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const FacultyApplicationForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isValidToken, setIsValidToken] = useState<boolean>(true);

  const params = useSearchParams();
  const { token } = useParams();
  const institution_id = params.get("institution_id");

  const validateToken = useQuery(api.invitation.validateToken, {
    token: token as string,
  });

  const getAllCourses = useQuery(api.courses.getAllCourses, {
    institution_id: institution_id as any,
  });

  const getAllDepartments = useQuery(api.department.getAllDepartments, {
    course_id: (course as any) || undefined,
  });

  const getAllSubjects = useQuery(api.subject.getAllSubjects, {
    departmentId: (department as any) || undefined,
  });

  const createFaculty = useMutation(api.faculty.createFaculty);

  useEffect(() => {
    if (validateToken === null) {
      setIsValidToken(false);
    }
  }, [validateToken]);

  if (
    validateToken === null ||
    validateToken === 404 ||
    validateToken === 410 ||
    validateToken === 403 ||
    validateToken === 500 ||
    validateToken === undefined
  ) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col text-red-500">
        <Loader2 className="animate-spin" />
        <p>
          If it's taking longer than usual, please contact the administrator.
          The link may no longer be valid.
        </p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!name || !email || !institution_id || selectedSubjects.length === 0) {
      toast.error(
        "Please fill in all required fields and select at least one subject",
        {
          position: "top-right",
        }
      );
      return;
    }

    try {
      const res = await createFaculty({
        name,
        email,
        institutionId: institution_id as any,
        teaching_subjects: selectedSubjects as any,
        isAvailable: false,
        isVerified: false,
        status: "pending",
      });

      if (res === 404) {
        toast.error("You have already submitted an application", {
          position: "top-right",
        });
        return;
      }

      toast.success("Faculty application submitted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to submit faculty application", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-96 h-auto px-6 space-y-4">
        <div className="flex flex-col gap-2">
          <Label className="text-xl font-bold">Hey! </Label>
          <Label className="text-xl font-bold">Let's Join The Institute</Label>
          <Separator />
        </div>
        <Input
          placeholder="Henry Kevil"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="username@emailprovider.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select onValueChange={setCourse}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {getAllCourses?.map((course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {course && (
          <Select onValueChange={setDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {getAllDepartments?.map((dept) => (
                <SelectItem key={dept._id} value={dept._id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {course &&
          department &&
          (getAllSubjects ? (
            getAllSubjects.length === 0 ? (
              <div className="w-full flex items-center justify-center text-red-500 text-[12px]">
                No Subjects are Added yet. Please contact the administrator
              </div>
            ) : (
              <CheckboxGroup
                className="w-full"
                value={selectedSubjects}
                onValueChange={setSelectedSubjects}
                label="Select Subjects"
              >
                {getAllSubjects?.map((sub) => (
                  <div key={sub._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={sub._id}
                      checked={selectedSubjects.includes(sub._id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSubjects([...selectedSubjects, sub._id]);
                        } else {
                          setSelectedSubjects(
                            selectedSubjects.filter((id) => id !== sub._id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={sub._id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {sub.name}
                    </Label>
                  </div>
                ))}
              </CheckboxGroup>
            )
          ) : (
            <div className="w-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ))}

        <Button onClick={handleSubmit} className="w-full">
          Submit Application
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default FacultyApplicationForm;
