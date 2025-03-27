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
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";

export function Hero() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<number>(0);
  const [minimumClass, setMinimumClass] = useState<number>(0);
  const [maximumClass, setMaximumClass] = useState<number>(0);

  const addCourse = useMutation(api.courses.addCourse);
  const addDepartment = useMutation(api.department.addDepartment);

  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);

  const handleClick = async () => {
    if (!courseName || !courseDuration) {
      toast.error("Please fill all the fields", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    await addCourse({
      name: courseName,
      duration: courseDuration,
    });
    console.log("Course added");
    toast.success("Course added", {
      duration: 2000,
      position: "top-right",
    });
    setCourseName("");
    setCourseDuration(0);
    setOpenDialog1(false);
  };

  const handleAddDepartment = async () => {
    if (!courseName || !courseDuration || !minimumClass || !maximumClass) {
      toast.error("Please fill all the fields", {
        duration: 2000,
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
    console.log(res);
    toast.success("Department added", {
      duration: 2000,
      position: "top-right",
    });
    setCourseName("");
    setCourseDuration(0);
    setMinimumClass(0);
    setMaximumClass(0);
    setOpenDialog2(false);
  };

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full h-full rounded-lg"
      >
        <ResizablePanel defaultSize={70} minSize={65} maxSize={75}>
          <div className="flex items-center w-full h-full justify-center p-6 flex-col gap-2">
            <div className="w-full h-full bg-cyan-300">
              {/* //Show the courses here */}
            </div>
            <Separator className="bg-black dark:bg-white" />
            <div className="w-full h-full bg-yellow-300">
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
                      value={courseDuration}
                      onChange={(e) =>
                        setCourseDuration(Number(e.target.value))
                      }
                    />
                    <Button className="w-full cursor-pointer" onClick={handleClick}>
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
                      Enter name of course
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter name of course"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    <Label className="dark:text-white text-black font-bold">
                      Enter name of course
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter duration of course"
                      value={courseDuration}
                      onChange={(e) =>
                        setCourseDuration(Number(e.target.value))
                      }
                    />
                    <Label className="dark:text-white text-black font-bold">
                      Enter name of course
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter minimum classes per day"
                      value={minimumClass}
                      onChange={(e) => setMinimumClass(Number(e.target.value))}
                    />

                    <Label className="dark:text-white text-black font-bold">
                      Enter name of course{" "}
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter maximum classes per day"
                      value={maximumClass}
                      onChange={(e) => setMaximumClass(Number(e.target.value))}
                    />
                    <Button className="w-full cursor-pointer" onClick={handleAddDepartment}>
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
