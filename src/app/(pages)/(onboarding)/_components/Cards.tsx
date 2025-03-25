import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  name: string;
  creationTime: number;
  institution_timing: string;
}

const Cards = ({ name, creationTime, institution_timing }: CardProps) => {
  return (
    <Card className="w-full h-auto cursor-pointer">
      <CardHeader>
        <CardTitle className="text-md font-bold">{name}</CardTitle>
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
