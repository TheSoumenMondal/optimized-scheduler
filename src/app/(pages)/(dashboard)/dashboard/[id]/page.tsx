"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Loader2Icon } from "lucide-react";
import { NotificationTable } from "../../_components/NotificationTable";
import Link from "next/link";
import { Hero } from "../../_components/Hero";

export default function DashboardPage() {
  const { id } = useParams();
  const [link, setLink] = React.useState<string>("");
  const [generated, setGenerated] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  const getSingleInstitutionDetails = useQuery(
    api.institution.getSingleInstitutionDetails,
    {
      institution_id: id as any,
    }
  );

  const getToken = useQuery(api.invitation.getToken, {
    institution_id: id as any,
  });

  React.useEffect(() => {
    if (getToken) {
      setLink(
        `${process.env.NEXT_PUBLIC_APP_URL!}/invitation?token=${getToken.token}`
      );
      setGenerated(true);
    }
  }, [getToken]);

  const createInvitation = useMutation(api.invitation.createInvitation);

  const generateLink = async () => {
    setIsGenerating(true);
    const response = await createInvitation({
      institution_id: id as any,
    });
    if (response) {
      setGenerated(true);
      setIsGenerating(false);
      setLink(
        `${process.env.NEXT_PUBLIC_APP_URL}/invitation?token=${response.token}`
      );
    }
  };

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Copied to clipboard", {
      duration: 1000,
      position: "top-right",
    });
  };

  return getSingleInstitutionDetails ? (
    <div className="flex flex-col space-y-2 mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="font-bold text-start text-xl p-4 pl-0 items-center">
          <div className="flex flex-col gap-2">
            {getSingleInstitutionDetails?.name}
            <div className="font-bold text-[12px] cursor-pointer select-none">
              {
                <div className="flex items-center flex-row gap-1">
                  <Link href={"/onboarding"}>Onboarding</Link>
                  {"  "}
                  <p className="flex items-center justify-center">
                    {" >       Dashboard"}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="button-groups pl-0 gap-3 flex md:justify-between">
          {/* /* Notification for accepting the faculty invitation */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="hidden md:flex items-center justify-center relative cursor-pointer mr-6">
                <div className="w-[8px] absolute -top-[0.05px] right-0 h-[8px] rounded-full bg-red-500 animate-pulse"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                  className="fill-black dark:bg-white  transition-colors"
                >
                  <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                </svg>
              </div>
            </DialogTrigger>
            <DialogContent className="pt-6">
              <DialogHeader>
                <DialogTitle className="text-xl select-none">
                  Faculty Invitation History
                </DialogTitle>
                <NotificationTable />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Invitation Link</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Your Unique Link </DialogTitle>
                <p className="text-[10px] text-rose-400">
                  Note:Once you generate a new link,older one will not be valid
                </p>
                <DialogDescription asChild>
                  <div>
                    <Input
                      className="text-sm font-semibold text-black dark:text-white"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <div className="flex mt-3 w-full gap-2 justify-between flex-col md:flex-row">
                      <Button
                        onClick={generateLink}
                        disabled={isGenerating}
                        className="md:w-[70%] w-full"
                      >
                        {isGenerating ? (
                          <>
                            "Generating"
                            <span>
                              <Loader2 className="animate-spin" />
                            </span>
                          </>
                        ) : generated ? (
                          "Generate New Link"
                        ) : (
                          "Generate Link"
                        )}
                      </Button>
                      <Button
                        onClick={handleCopyLink}
                        className="md:w-[30%] w-full"
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator />

      <div className="w-full h-[74vh]">
        <Hero />
      </div>

      <Toaster />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2Icon className="w-10 h-10 animate-spin" />
    </div>
  );
}
