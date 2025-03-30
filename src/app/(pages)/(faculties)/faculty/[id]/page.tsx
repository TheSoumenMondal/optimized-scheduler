"use client";

import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import StatusChangerButton from "../../_components/StatusChangerButton";

const CreateInvite = () => {
  const { id } = useParams();

  // State hooks
  const [invitationLink, setInvitationLink] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // Query hooks
  const getDepartmentDetails = useQuery(api.department.getDepartmentDetails, {
    department_id: id as string,
  });

  const getCourseDetails = useQuery(api.courses.getCourseDetails, {
    course_id: getDepartmentDetails?.course_id as any,
  });

  const getInvitationForInstitute = useQuery(
    api.invitation.getInvitationForInstitute,
    {
      institution_id: getCourseDetails?.institution_id as any,
    }
  );

  // Mutation hooks
  const createInvitation = useMutation(api.invitation.createInvitation);

  // Effect hooks
  useEffect(() => {
    if (getInvitationForInstitute?.[0]?.token) {
      setInvitationLink(
        `${process.env.NEXT_PUBLIC_APP_URL}/invitation/${getInvitationForInstitute[0].token}?institution_id=${getCourseDetails?.institution_id}`
      );
    }
  }, [getInvitationForInstitute, getCourseDetails?.institution_id]);

  const getAllFaculties = useQuery(api.faculty.getAllFaculties, {
    institutionId: getCourseDetails?.institution_id as any,
  });

  if (!getCourseDetails) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const createInvite = async () => {
    setIsGenerated(true);
    try {
      if (!getCourseDetails?.institution_id) {
        toast.error("Institution not found", {
          duration: 2000,
          position: "top-right",
        });
        return;
      }

      const res = await createInvitation({
        institution_id: getCourseDetails.institution_id,
      });
      if (res) {
        setInvitationLink(
          `${process.env.NEXT_PUBLIC_APP_URL}/invitation/${res.token}?institution_id=${getCourseDetails.institution_id}`
        );
        toast.success("Invitation created", {
          duration: 2000,
          position: "top-right",
        });
      }
      return res;
    } catch (error) {
      console.error("Error creating invitation:", error);
      throw error;
    } finally {
      setIsGenerated(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    toast.success("Copied to clipboard", {
      duration: 2000,
      position: "top-right",
    });
  };

  return (
    <div className="w-full h-full">
      <nav className="w-full h-auto justify-end flex items-center mt-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Generate Invite Link</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Invite Link</DialogTitle>
              <div className="mt-2">
                <Input
                  value={invitationLink}
                  readOnly
                  onChange={(e) => setInvitationLink(e.currentTarget.value)}
                />
              </div>
            </DialogHeader>
            <div className="flex items-center justify-between flex-col gap-3">
              <Button
                className="w-full"
                onClick={createInvite}
                disabled={!getCourseDetails?.institution_id}
              >
                {isGenerated ? "Generating..." : "Generate Invite Link"}
              </Button>
              <Button
                variant={"secondary"}
                className="w-full"
                onClick={handleCopyToClipboard}
              >
                Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </nav>
      <div className="w-full grid-cols-8 mt-4 flex">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Request Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAllFaculties?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item._creationTime}</TableCell>
                <TableCell className="text-right">
                  <StatusChangerButton id ={item._id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateInvite;
