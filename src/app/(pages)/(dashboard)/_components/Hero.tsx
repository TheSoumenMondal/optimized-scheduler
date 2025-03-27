"use client";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import CourseCard from "./CourseCard";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function Hero() {
  const { id } = useParams();
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<number>(0);
  const [minimumClass, setMinimumClass] = useState<number>(0);
  const [maximumClass, setMaximumClass] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const addCourse = useMutation(api.courses.addCourse);
  const addDepartment = useMutation(api.department.addDepartment);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleClick = async () => {
    try {
      if (!id) {
        toast.error("Institution ID is missing");
        return;
      }
      if (!courseName.trim()) {
        toast.error("Course name is required");
        return;
      }
      if (courseDuration <= 0) {
        toast.error("Course duration must be greater than 0");
        return;
      }
      // Check if course already exists in the current courses list
      const courseExists = courses.some(
        (course) =>
          course.name.toLowerCase() === courseName.trim().toLowerCase()
      );
      if (courseExists) {
        toast.error(`Course with name ${courseName} already exists`);
        return;
      }
      const response = await addCourse({
        institution_id: id as any,
        name: courseName,
        duration: courseDuration,
      });
      if (response) {
        toast.success("Course added successfully", {
          position: "top-right",
        });
        setCourseName("");
        setCourseDuration(0);
        setOpenDialog1(false);
      }
    } catch (error: any) {
      console.error("Error adding course:", error);
      toast.error(error.message || "Failed to add course");
    }
  };

  const handleAddDepartment = async () => {
    try {
      if (!courseName.trim()) {
        toast.error("Department name is required", {
          position: "top-right",
        });
        return;
      }

      if (courseDuration <= 0) {
        toast.error("Duration must be greater than 0", {
          position: "top-right",
        });
        return;
      }

      if (minimumClass <= 0) {
        toast.error("Minimum classes must be greater than 0", {
          position: "top-right",
        });
        return;
      }

      if (maximumClass <= 0) {
        toast.error("Maximum classes must be greater than 0", {
          position: "top-right",
        });
        return;
      }

      if (minimumClass > maximumClass) {
        toast.error("Minimum classes cannot be greater than maximum classes", {
          position: "top-right",
        });
        return;
      }

      const res = await addDepartment({
        name: courseName,
        years: courseDuration,
        minimum_classes_per_day: minimumClass,
        max_classes_per_day: maximumClass,
      });

      if (res) {
        toast.success("Department added successfully", {
          position: "top-right",
        });
        setCourseName("");
        setCourseDuration(0);
        setMinimumClass(0);
        setMaximumClass(0);
        setOpenDialog2(false);
      }
    } catch (error: any) {
      console.error("Error adding department:", error);
      toast.error(error.message || "Failed to add department");
    }
  };

  const getAllCourses = useQuery(api.courses.getAllCourses, {
    institution_id: id as any,
  });

  useEffect(() => {
    try {
      if (getAllCourses) {
        setCourses(getAllCourses);
      }
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      toast.error(error.message || "Failed to fetch courses");
    }
  }, [getAllCourses]);

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full h-full rounded-lg"
      >
        <ResizablePanel defaultSize={70} minSize={65} maxSize={75}>
          <div className="flex items-center w-full h-full justify-center p-6 flex-col gap-2">
            <div className="w-full h-full  grid grid-cols-5 gap-3">
              {/* //Show the courses here */}
              {courses?.length === 0 ? (
                <p className="font-bold">No courses available yet</p>
              ) : (
                courses.map((course: any, index: number) => (
                  <BlurFade key={course._id} delay={0.25 + index * 0.05} inView>
                    <CourseCard
                      key={index}
                      name={course.name}
                      duration={course.duration}
                    />
                  </BlurFade>
                ))
              )}
            </div>
            <Separator className="bg-black dark:bg-white" />
            <div className="w-full h-full">
              {/* //Show  the departments here */}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-1" />
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center flex-col gap-3 justify-center p-6">
            <Dialog open={openDialog1} onOpenChange={setOpenDialog1}>
              <DialogTrigger asChild>
                <Button>Add Courses Offered</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-5">
                    Add all details below properly to add a course..
                  </DialogTitle>
                  <DialogDescription className="space-y-3">
                    <Input
                      placeholder="Enter name of course"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    <Input
                      placeholder="Enter duration of course"
                      type="number"
                      value={courseDuration}
                      onChange={(e) =>
                        setCourseDuration(Number(e.target.value))
                      }
                    />

                    <Button
                      className="w-full cursor-pointer"
                      onClick={handleClick}
                    >
                      Add course
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog open={openDialog2} onOpenChange={setOpenDialog2}>
              <DialogTrigger asChild>
                <Button className="w-auto px-7">Add department</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-5">
                    Add all details below properly to add a department..
                  </DialogTitle>
                  <DialogDescription className="space-y-3">
                    <Label className="dark:text-white text-black font-bold">
                      Department Name
                    </Label>
                    <Input
                      placeholder="Enter department name"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    <Label className="dark:text-white text-black font-bold">
                      Duration (in years)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter duration in years"
                      value={courseDuration}
                      onChange={(e) =>
                        setCourseDuration(Number(e.target.value))
                      }
                    />
                    <Label className="dark:text-white text-black font-bold">
                      Minimum Classes Per Day
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter minimum classes per day"
                      value={minimumClass}
                      onChange={(e) => setMinimumClass(Number(e.target.value))}
                    />
                    <Label className="dark:text-white text-black font-bold">
                      Maximum Classes Per Day
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter maximum classes per day"
                      value={maximumClass}
                      onChange={(e) => setMaximumClass(Number(e.target.value))}
                    />
                    {/* Add a select course filed her  */}
                    <Label>Select the preferred course</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          {courses.map((course: any, index: number) => (
                            <SelectItem key={index} value={course.name}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      className="w-full cursor-pointer"
                      onClick={handleAddDepartment}
                    >
                      Add Department
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster />
    </div>
  );
}
