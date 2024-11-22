import { Edit2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useUpdatePostDialogStore } from "@/stores/update-post-dialog-store";

interface UpdatePostDialogProps {
    children: React.ReactNode;
}

export function UpdatePostDialog({ children }: UpdatePostDialogProps) {
    const { handleOpenChange, isOpen } = useUpdatePostDialogStore();
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange} modal={true}>
            <DialogTrigger asChild>
                <button className="flex items-center space-x-2 p-2 text-sm">
                    <Edit2 className="mr-2 size-4" />
                    Update post
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Update Post</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px]">{children}</ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
