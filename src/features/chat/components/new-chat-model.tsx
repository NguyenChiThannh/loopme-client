import { PlusCircleIcon, PlusIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NewChatModalProps {
    children?: React.ReactNode;
}

export default function NewChatModal({ children }: NewChatModalProps) {
    return (
        <Dialog>
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
                <div className="flex flex-col w-full space-y-4">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
