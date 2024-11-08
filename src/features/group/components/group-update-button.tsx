import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import GroupForm from "./group-form";

export default function GroupUpdateButton() {
    const [isOpen, setIsOpen] = useState(false);
    const handleCreateGroup = () => {
        setIsOpen(false);
    };
    const initialData = {
        id: "1",
        title: "test",
        backgroundCover: undefined,
        isPublic: true,
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Update Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Group</DialogTitle>
                </DialogHeader>
                <GroupForm
                    onSubmit={handleCreateGroup}
                    initialData={initialData}
                />
            </DialogContent>
        </Dialog>
    );
}
