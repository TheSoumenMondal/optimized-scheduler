import { Card, CardBody } from "@heroui/card";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DepartmentCard({ id }: { id: string }) {
  const router = useRouter();

  const departments = useQuery(api.department.getAllDepartments, {
    course_id: id as any,
  });

  if (!departments)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  const list = departments
    ? departments.map((department) => ({
        title: department.name,
        color: "",
        maxClasses: department.max_classes_per_day || "",
        _id: department._id,
      }))
    : [];

  const handleClick = (id: string) => {
    router.push(`/department/${id}`);
  };

  return (
    <ScrollArea className="w-full h-[550px]">
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 p-4">
        {list.length > 0 ? (
          list.map((item, index) => (
            <Card
              key={`department-${index}`}
              isPressable
              shadow="sm"
              onPress={() => console.log("Department selected:", item.title)}
            >
              <CardBody className="overflow-visible p-0">
                <Button
                  onClick={() => handleClick(item._id)}
                  asChild
                  className="flex items-center justify-center text-md font-bold"
                  style={{
                    backgroundColor: item.color,
                    width: "100%",
                    borderRadius: "0.5rem",
                  }}
                >
                  <span>{item.title}</span>
                </Button>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="col-span-full h-[500px] flex flex-col items-center justify-center">
            <p className="text-center">No Departments added yet</p>

            <p className="text-center">
              Please try to add department for this course
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
