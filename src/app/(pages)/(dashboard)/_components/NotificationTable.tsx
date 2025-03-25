import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";

export function NotificationTable() {
  const { id } = useParams();

  const getInvitationForInstitute = useQuery(api.faculty.getAllFaculty, {
    institutionId: id as any,
  });
  // Ensure invitations is always an array
  const invitations = getInvitationForInstitute || [];

  return (
    <Table className="select-none">
      <TableCaption>A list of all invitations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(invitations) &&
          invitations.length > 0 &&
          invitations.map((inv: any) => (
            <TableRow key={inv._id}>
              <TableCell>{inv.name}</TableCell>
              <TableCell className="font-sm">{inv.email}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell className="text-right">{inv.department}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
