import { PlusCircle, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    onNewChat: () => void;
}

export default function EmptyStateCard({ onNewChat }: EmptyStateProps) {
    return (
        <div className="flex flex-grow items-center justify-center">
            <div className="text-center">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No contacts
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by adding a new contact.
                </p>
                <div className="mt-6">
                    <Button onClick={onNewChat}>
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add contact
                    </Button>
                </div>
            </div>
        </div>
    );
}
