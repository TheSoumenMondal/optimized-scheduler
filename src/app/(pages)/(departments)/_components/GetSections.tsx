import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const GetSections = () => {
  const { id } = useParams();


  const getYear = useQuery(api.years.getAllYears, {
    department_id: id as any,
  });

  return (
    <div className="p-6 w-full h-full rounded-lg shadow-md">
      <div className="space-y-6 p-4">
        {getYear?.map((year) => (
          <div key={year._id} className="flex items-center space-x-4">
            <h4 className="text-base font-semibold min-w-[100px]">
              {year.name} Year
            </h4>
            <div className="flex-1 border p-4 rounded-lg shadow-sm">
              <SectionsForYear yearId={year._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionsForYear = ({ yearId }: { yearId: string }) => {
  const sections = useQuery(api.section.getSection, {
    year_id: yearId as any,
  });

  if (!sections || sections.length === 0) {
    return <p className="text-sm italic">No sections available</p>;
  }

  return (
    <div className="flex justify-center items-center gap-4">
      {sections.map((section) => (
        <div
          key={section._id}
          className="p-3 border rounded-md text-sm font-medium"
        >
          {section.name}
        </div>
      ))}
    </div>
  );
};

export default GetSections;
