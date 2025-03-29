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
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import { CourseCard } from "./CourseCard";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Label } from "@/components/ui/label";

export function Hero() {
  const { id } = useParams();
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<number>(0);
  const [courses, setCourses] = useState<any[]>([]);
  const addCourse = useMutation(api.courses.addCourse);
  const [openDialog1, setOpenDialog1] = useState(false);

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
      if (response === 404) {
        toast.error("This Course Already Exists", {
          position: "top-right",
        });
        return;
      }
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
            <div className="grid grid-cols-5 gap-3">
              {/* //Show the courses here */}
              {courses?.length === 0 ? (
                <p className="font-bold">No courses available yet</p>
              ) : (
                courses.map((course: any, index: number) => (
                  <BlurFade key={course._id} delay={0.25 + index * 0.05} inView>
                    <CourseCard
                      id={course._id}
                      key={index}
                      name={course.name}
                      duration={course.duration}
                    />
                  </BlurFade>
                ))
              )}
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
                    <Label>Enter the duration of the course</Label>
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
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster />
    </div>
  );
}
