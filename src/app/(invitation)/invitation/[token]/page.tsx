// "use client";

// import React, { useState } from "react";
// import { useMutation } from "convex/react";
// import { useSearchParams } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { api } from "../../../../../convex/_generated/api";

// const FacultyForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     department: "",
//   });
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const createFaculty = useMutation(api.faculty.createFaculty);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMessage("");
//     setIsSubmitting(true);

//     try {
//       if (!token) {
//         setMessage("Error: No invitation token provided in the URL.");
//         return;
//       }

//       const result = await createFaculty({
//         token,
//         name: formData.name,
//         email: formData.email,
//         department: formData.department,
//       });

//       if (result === 404) {
//         setMessage("Error: Invalid or expired invitation token.");
//       } else if (result === 400) {
//         setMessage("Error: Faculty with this email already exists.");
//       } else {
//         setMessage("Faculty registration successful! Awaiting admin approval.");
//         setFormData({
//           name: "",
//           email: "",
//           department: "",
//         });
//       }
//     } catch (error) {
//       setMessage("Error: Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <div className="md:w-96 mx-auto my-12 p-6 rounded-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Faculty Registration
//         </h2>
//         {token ? (
//           <p className="text-gray-600 text-sm text-center">Using Valid token :)</p>
//         ) : (
//           <p className="text-red-600 text-sm text-center">
//             No invitation token found. Please use a valid link.
//           </p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name" className="block font-semibold mb-1">
//               Name:
//             </Label>
//             <Input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="email" className="block font-semibold mb-1">
//               Email:
//             </Label>
//             <Input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//           </div>
//           <div>
//             <Label htmlFor="department" className="block font-semibold mb-1">
//               Department:
//             </Label>
//             <Input
//               type="text"
//               id="department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               required
//               className="w-full"
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={!token || isSubmitting}
//             className="w-full cursor-pointer"
//           >
//             {isSubmitting ? (
//                 <>
//                 <p className="select-none">Submitting...</p>
//                 <span><Loader2 className="animate-spin"/></span>
//                 </>
//             ) : "Submit Request"}
//           </Button>
//         </form>
//         {message && (
//           <p
//             className={`mt-4 text-center text-[12px] ${
//               message.startsWith("Error") ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FacultyForm;




import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page