import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { XIcon } from "lucide-react";
import AddDepartment from "./AddDepartment";

interface CourseCardProps {
  id: string;
  name: string;
  duration: number;
}

export function CourseCard({ name, duration, id }: CourseCardProps) {
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <MorphingDialogTrigger className="cursor-pointer">
        <div className="rounded-xl border dark:border-gray-200 border-gray-700 dark:bg-white bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 py-4 px-3 flex items-center justify-center flex-col">
          <h3 className="text-xl font-bold text-white dark:text-black mb-2">
            {name}
          </h3>
          <p className="text-sm text-white dark:text-black">
            Duration: {duration} years
          </p>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative">
          <AddDepartment id={id} />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
