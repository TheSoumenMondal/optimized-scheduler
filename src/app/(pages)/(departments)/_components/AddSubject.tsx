import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState<string>("");
  const [subject_code, setSubject_code] = useState<string>("");
  const [isPractical, setIsPractical] = useState<boolean>(false);
  const [classDuration, setClassDuration] = useState<number>(0);
  const [per_week_timing, setPerWeekTiming] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const { id } = useParams();

  //Mutations and queries
  const getAllYears = useQuery(api.years.getAllYears, {
    department_id: id as any,
  });
  const addSubject = useMutation(api.subject.addSubject);

  const handleAddSubject = async () => {
    if (
      !subjectName ||
      !subject_code ||
      !selectedYear ||
      !classDuration ||
      !per_week_timing
    ) {
      toast.error("Please fill all the details", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    const res = await addSubject({
      name: subjectName,
      subject_code: subject_code,
      isPractical: isPractical,
      Class_duration: classDuration,
      per_week_timing: per_week_timing,
      yearId: selectedYear as any,
      departmentId: id as any,
    });
    if (res.status === 400) {
      toast.error("Subject already exists", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    toast.success("Subject added successfully", {
      duration: 2000,
      position: "top-right",
    });
    setSubjectName("");
    setSubject_code("");
    setIsPractical(false);
    setClassDuration(0);
    setPerWeekTiming(0);
    setSelectedYear("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Subjects</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please fill details carefully</DialogTitle>
            <DialogDescription className="space-y-2">
              <Label>
                Enter name of the subject
                <Input
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Mathematics"
                  type="text"
                />
              </Label>
              <Label>
                Enter the subject code
                <Input
                  value={subject_code}
                  onChange={(e) => setSubject_code(e.target.value)}
                  placeholder="MAT101"
                  type="text"
                />
              </Label>
              <Label>
                What is one class duration (In minutes)
                <Input
                  value={classDuration}
                  onChange={(e) => setClassDuration(Number(e.target.value))}
                  placeholder="30"
                  type="number"
                />
              </Label>
              <Label>
                How many hours are reserved per week ? (In minutes)
                <Input
                  value={per_week_timing}
                  onChange={(e) => setPerWeekTiming(Number(e.target.value))}
                  placeholder="180"
                  type="number"
                />
              </Label>

              <Label>
                Select Academic Year
                <Select onValueChange={(value) => setSelectedYear(value)}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllYears &&
                      getAllYears.map((year, index) => (
                        <SelectItem key={index} value={year._id}>
                          {year.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </Label>

              <Label>
                Is this a Practical ?
                <Checkbox
                  checked={isPractical}
                  onCheckedChange={(checked) =>
                    setIsPractical(checked as boolean)
                  }
                />
              </Label>
              <Button
                className="w-full cursor-pointer"
                onClick={handleAddSubject}
              >
                Add Subject
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddSubject;
