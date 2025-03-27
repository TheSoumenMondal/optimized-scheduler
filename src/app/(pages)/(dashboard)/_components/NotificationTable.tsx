import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";


export function NotificationTable() {
  const { id } = useParams();

  const getInvitationForInstitute = useQuery(api.faculty.getAllFaculty, {
    institutionId: id as any,
  });

  const updateFacultyStatus = useMutation(api.faculty.approveFaculty);

  const invitations = getInvitationForInstitute || [];

  const handleUpdateStatus = async (facultyId: string) => {
    await updateFacultyStatus({
      institutionId: id as any,
      faculty_id: facultyId as any,
      status: "approved"
    });
  };

  return (
    <Table className="select-none">
      <TableCaption>A list of all invitations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(invitations) &&
          invitations.length > 0 &&
          invitations.map((inv: any) => (
            <TableRow key={inv._id}>
              <TableCell>{inv.name}</TableCell>
              <TableCell>{inv.department}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => handleUpdateStatus(inv._id)} 
                  variant="outline" 
                  className="hover:cursor-pointer"
                >
                  Accept?
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
