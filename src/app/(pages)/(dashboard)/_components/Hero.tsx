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

export function Hero() {
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<number>(0);
  const [minimumClass, setMinimumClass] = useState<number>(0);
  const [maximumClass, setMaximumClass] = useState<number>(0);

  const addCourse = useMutation(api.courses.addCourse);

  const handleClick = async () => {
    await addCourse({
      name: courseName,
      duration: courseDuration,
    });
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full h-full rounded-lg"
    >
      <ResizablePanel defaultSize={70} minSize={65} maxSize={75}>
        <div className="flex items-center w-full h-full justify-center p-6">
          <span className="font-semibold">
            Welcome to the dashboard of the institute!
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle className="w-1" />
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center flex-col gap-3 justify-center p-6">
          <Dialog>
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
                    onChange={(e) => setCourseDuration(Number(e.target.value))}
                  />
                  <Button className="w-full" onClick={handleClick}>
                    Add course
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-auto px-7">Add department</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Add all details below properly to add a department..
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
                    onChange={(e) => setCourseDuration(Number(e.target.value))}
                  />
                  <Input
                    placeholder="Enter minimum classes per day"
                    value={minimumClass}
                    onChange={(e) => setMinimumClass(Number(e.target.value))}
                  />
                  <Input
                    placeholder="Enter maximum classes per day"
                    value={maximumClass}
                    onChange={(e) => setMaximumClass(Number(e.target.value))}
                  />
                  <Button className="w-full" onClick={handleClick}>
                    Add course
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
