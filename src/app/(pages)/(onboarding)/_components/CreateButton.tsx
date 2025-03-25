"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2, Plus } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@stackframe/stack";

const CreateButton = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [rooms, setRooms] = React.useState(0);
  const [institution, setInstitution] = React.useState("");
  const createInstitution = useMutation(api.institution.createInstitution);
  const user = useUser();
  const email = user?.primaryEmail;
  const handleClick = () => {
    if (name.length === 0 || rooms === 0 || institution.length === 0) {
      setLoading(false);
      toast.error("Please fill all the fields", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    setLoading(true);
    createInstitution({
      name: name,
      admin_email: email!,
      total_rooms_available: rooms,
      institution_timing: institution,
    })
      .then(() => {
        toast.success("Institution created successfully", {
          duration: 3000,
          position: "top-right",
        });
      })
      .catch(() => {
        toast.error("Something went wrong", {
          duration: 3000,
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
        setName("");
        setRooms(0);
        setInstitution("");
        setOpen(false);
      });
  };

  return (
    <Button asChild>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-6 py-6 w-full sm:w-fit">
            <p className="font-bold">Create New</p>
            <span className="font-bold text-xl">
              <Plus className="font-bold" />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] select-none">
          <DialogHeader>
            <DialogTitle>
              Please provide institution details carefully
            </DialogTitle>
            <DialogDescription className="text-[12px]">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-start">
                Name of the Institute
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username">Total rooms available</Label>
              <Input
                min={0}
                type="number"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                placeholder="123"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username">Timing of institution</Label>
              <Input
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="ABC Academy"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleClick} type="submit">
              {loading ? (
                <span className="flex items-center gap-2">
                  Generating your space
                  <Loader2 className="animate-spin" />
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
        <Toaster />
      </Dialog>
    </Button>
  );
};

export default CreateButton;
