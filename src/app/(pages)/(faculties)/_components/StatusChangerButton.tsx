import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

interface StatusChangerButtonProps {
  id: string;
}

const StatusChangerButton = ({ id }: StatusChangerButtonProps) => {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [isOpen, setIsOpen] = useState(false);

  const verifyFaculty = useMutation(api.faculty.verifyFaculty);

  const handleChangeFacultyStatus = async () => {
    try {
      await verifyFaculty({
        faculty_id: id as any,
        status: status,
      });
    } catch (error) {
      console.error("Failed to update faculty status:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Change Status</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-6">
              Please select an option to change status
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <Select
                value={status}
                defaultValue={status}
                onValueChange={(v) =>
                  setStatus(v as "pending" | "approved" | "rejected")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={handleChangeFacultyStatus}>
                Save Changes
              </Button>
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusChangerButton;
