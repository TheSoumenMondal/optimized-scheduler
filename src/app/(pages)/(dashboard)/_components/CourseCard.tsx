import React from "react";

interface CourseCardProps {
  name: string;
  duration: number;
}

const CourseCard = ({ name, duration }: CourseCardProps) => {
  return (
    <div className="w-full max-w-sm h-fit rounded-xl border dark:border-gray-200 border-gray-700 dark:bg-white bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 py-4 px-3 flex items-center justify-center flex-col">
      <h3 className="text-xl font-bold text-white dark:text-black mb-2">
        {name}
      </h3>
      <p className="text-sm text-white dark:text-black">
        Duration: {duration} years
      </p>
    </div>
  );
};

export default CourseCard;
