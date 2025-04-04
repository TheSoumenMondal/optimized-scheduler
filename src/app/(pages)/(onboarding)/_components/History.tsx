import { useUser } from "@stackframe/stack";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Cards from "./Cards";
import { BlurFade } from "@/components/magicui/blur-fade";

const History = () => {
  const user = useUser();
  const email = user?.primaryEmail;

  if (!email) {
    return null;
  }

  const getAllInstitutes = useQuery(api.institution.getAllInstitutes, {
    admin_email: email,
  });

  if (!getAllInstitutes) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-2">
      {getAllInstitutes.length > 0 &&
        getAllInstitutes.map((institute, index) => (
          <BlurFade key={index} delay={0.25 + index * 0.05} inView>
            <Cards
              institution_id={institute._id}
              key={index}
              cardName={institute.name}
              creationTime={institute._creationTime}
              institution_timing={institute.institution_timing}
            />
          </BlurFade>
        ))}
    </div>
  );
};

export default History;
