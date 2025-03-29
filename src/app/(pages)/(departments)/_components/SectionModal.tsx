"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SectionModel() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [sectionName, setSectionName] = useState<string>("");
  const [hasGroups, setHasGroups] = useState<boolean>(false);
  const [year_id, setYear_id] = useState<string>("");
  const [years, setYears] = useState<Array<any>>([]);

  const [groups, setGroups] = useState<Array<string>>([]);

  const [groupNum, setGroupNum] = useState<number>(0);

  const getDepartmentDetails = useQuery(api.department.getDepartmentDetails, {
    department_id: id as string,
  });

  const getCourseDetails = useQuery(api.courses.getCourseDetails, {
    course_id: getDepartmentDetails?.course_id as any,
  });

  const createSection = useMutation(api.section.createSection);

  const handleCreateSection = async () => {
    const res = await createSection({
      name: sectionName,
      hasGroups: hasGroups,
      year_id: year_id as any,
      department_id: id as any,
      groups: groups,
    });
    if (res === 404) {
      toast.error("Already exists", {
        position: "top-right",
      });
      return;
    }
    toast.success("Section Created Successfully", {
      position: "top-right",
    });
  };

  const generateYears = useMutation(api.years.generateYears);

  if (getCourseDetails === 404) {
    toast.error("Course not found", {
      duration: 3000,
      position: "top-right",
    });
    return null;
  }

  const getYears = useQuery(api.years.getAllYears, {
    department_id: id as any,
  });

  useEffect(() => {
    const createYears = async () => {
      if (getCourseDetails && getCourseDetails.duration) {
        for (let i = 0; i < getCourseDetails.duration; i++) {
          const res = await generateYears({
            department_id: id as any,
            name: i + 1,
          });
        }
      }
    };

    createYears();
  }, [getCourseDetails, generateYears]);

  useEffect(() => {
    if (getYears) {
      setYears(getYears);
    }
  }, [getYears]);

  const handleHasGroupsChange = (value: string) => {
    setHasGroups(value === "true");
  };

  const handleYearChange = (value: string) => {
    setYear_id(value);
  };

  useEffect(() => {
    setGroupNum(0);
    setGroups([]);
  }, [hasGroups]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md dark:bg-white dark:text-black font-bold text-sm bg-gray-800 text-white hover:opacity-90 transition-opacity"
      >
        Add Sections
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Section Details Please</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter the name of the section"
                  type="text"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  aria-label="Section name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm" htmlFor="hasGroups">Has Any Groups?</Label>
                <Select
                  defaultValue={hasGroups ? "true" : "false"}
                  onValueChange={handleHasGroupsChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select</SelectLabel>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearSelect">Select the Year</Label>
                <Select onValueChange={handleYearChange}>
                  <SelectTrigger className="w-full" id="yearSelect">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select</SelectLabel>
                      {years.map((year) => (
                        <SelectItem key={year._id} value={year._id}>
                          {year.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {hasGroups && (
                  <div className="space-y-3">
                    <Label className="text-sm">Enter number of Groups</Label>
                    <Input
                      placeholder="Enter number of Groups "
                      value={groupNum}
                      onChange={(e) => setGroupNum(Number(e.target.value))}
                    />
                    <Label className="text-sm">Enter group names separated by comma</Label>
                    <Input
                      placeholder="Enter group names separated by comma"
                      type="text"
                      value={groups.join(", ")}
                      onChange={(e) =>
                        setGroups(e.target.value.trim().split(", "))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="mr-2"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                handleCreateSection();
                setIsOpen(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
