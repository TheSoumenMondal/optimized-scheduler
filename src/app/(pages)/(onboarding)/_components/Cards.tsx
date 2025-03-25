import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CardProps {
  cardName: string;
  creationTime: number;
  institution_timing: string;
  institution_id : string;
}



const Cards = ({ cardName, creationTime, institution_timing,institution_id }: CardProps) => {
  const router = useRouter()
  const handle_click = (institution_id : string) : void=>{
    router.push(`/dashboard/${institution_id}`)
  }
  return (
    <Card className="w-full h-auto cursor-pointer" onClick={() => handle_click(institution_id)}>
      <CardHeader>
        <CardTitle className="text-md font-bold h-12">{cardName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Timing: {institution_timing}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-600">
          {new Date(creationTime).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Cards;
