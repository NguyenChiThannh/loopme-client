import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import GroupForm from "./group-form";
import { useState } from "react";

export default function GroupCreateButton() {
    const [isOpen, setIsOpen] = useState(false);
    const handleCreateGroup = (formData: FormData) => {
        console.log(formData);
        setIsOpen(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create New Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                </DialogHeader>
                <GroupForm onSubmit={handleCreateGroup} />
            </DialogContent>
        </Dialog>
    );
}