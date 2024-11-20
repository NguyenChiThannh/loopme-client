import { PlusCircleIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useContactDialogStore } from "@/stores/contact-dialog-store";

interface NewChatModalProps {
    children?: React.ReactNode;
}

export default function NewChatModal({ children }: NewChatModalProps) {
    const { handleOpenChange, isOpen } = useContactDialogStore();
    return (
        <Dialog onOpenChange={handleOpenChange} open={isOpen}>
            <DialogTrigger>
                <Button variant={"outline"} size={"icon"}>
                    <PlusCircleIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Chat</DialogTitle>
                    <DialogDescription>
                        Start a new chat with a friend.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex w-full flex-col space-y-4">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
